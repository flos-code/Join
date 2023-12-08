let currentDraggedElement;
let filteredToDos = [];
let originalTodos = [];
let editPrio;
let editSubtasks = [];
let addTaskPrio;
let addTaskStatus;

/**
 * all necessary data and HTML files are loaded to display them on the page
 */
async function initBoard() {
  await includeHTML();
  await loadData();
  todos = tasks;
  originalTodos = todos.slice();
  await updateHTML();
}

/**
 * the html  for each possible Status of the Tasks get updated
 */
async function updateHTML() {
  updateSection("toDo", "toDoStatus", "to Do");
  updateSection("inProgress", "inProgressStatus", "in Progress");
  updateSection("awaitFeedback", "awaitFeedbackStatus", "await Feedback");
  updateSection("done", "doneStatus", "done");
}

/**
 * If a Task with the status exist it will be generated in the matching Sections
 * 
 * @param {string} sectionId - ID of the selected Section
 * @param {string} status - Status of the selected Task
 * @param {string} header - Headline of the selected Section
 */
function updateSection(sectionId, status, header) {
  let filteredTasks = filterTasksByStatus(status);
  document.getElementById(sectionId).innerHTML = "";
  if (filteredTasks.length === 0) {
    document.getElementById(sectionId).innerHTML = generateNoTodoHTML(header);
  } else {
    for (let index = 0; index < filteredTasks.length; index++) {
      let element = filteredTasks[index];
      document.getElementById(sectionId).innerHTML += generateTodoHTML(element);
      formatTask(element);
    }
  }
}

/**
 * Filter Taskes based on their status
 * 
 * @param {string} status - Status of the selected Task
 * @returns returns the status of the Task
 */
function filterTasksByStatus(status) {
  if (filteredToDos.length !== 0) {
    return filteredToDos.filter((t) => t["status"] == status);
  } else if (document.getElementById("findTask").value) {
    return [];
  } else {
    return originalTodos.filter((t) => t["status"] == status);
  }
}

/**
 * The id of the dragged Task gets stored in currentDraggedElement
 * 
 * @param {number} id - Id of the Selected Task
 */
function startDragging(id) {
  currentDraggedElement = id;
}


/**
 * Makes it possbile to drop a drages Task in the disired Section
 * 
 * @param {object} ev - Event Object when Taks gets droped in a Section
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Gives the selected Task the new status where it was placed via drag and drop
 * 
 * @param {string} status - Status of the selected Task
 */
async function moveTo(status) {
  let draggedTask = originalTodos.splice(currentDraggedElement, 1)[0];
  let draggedTaskOriginal = tasks.splice(currentDraggedElement, 1)[0];
  draggedTask.status = status;
  draggedTaskOriginal.status = status;
  originalTodos.push(draggedTask);
  tasks.push(draggedTaskOriginal);
  for (let i = 0; i < originalTodos.length; i++) {
    originalTodos[i].id = i;
    tasks[i].id = i;
  }
  await setItem('tasks', JSON.stringify(tasks));
  updateHTML();
}

/**
 * Open an overlay to see all information saved in the selected Task
 * 
 * @param {number} id - Id of the Selected Task
 */
function openToDo(id) {
  let todo = originalTodos[id];
  editPrio = originalTodos[id]["prio"];
  editSubtasks =
    originalTodos[id][
      "subtasks"
    ].slice();
  let originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.getElementById("boradContent").innerHTML += generateToDoOpenHTML(todo, id);
  setTimeout(() => {
    document.getElementById("toDoOpen").classList.add("showToDoOpen");
  }, 0);
  setTimeout(() => {
    document.body.style.overflow = originalOverflow;
  }, 200);
  formatOpenToDo(todo, id);
}

/**
 * close the Overlay with all the information of the Task
 */
function closeToDo() {
  assignedUsers = [];
  selectedUsers = [];
  let originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.getElementById("toDoOpen").classList.remove("showToDoOpen");
  setTimeout(() => {
    document.getElementById("toDoOpenBg").remove();
    updateHTML();
    document.body.style.overflow = originalOverflow;
  }, 200);
}

/**
 * deletes the Slected Task from the board and the Tasks array
 * 
 * @param {number} id - Id of the Selected Task
 */
async function deletToDo(id) {
  originalTodos.splice(id, 1);
  tasks.splice(id, 1);
  for (let i = 0; i < originalTodos.length; i++) {
    originalTodos[i]["id"] = i;
    tasks[i]["id"] = i;
  }
  await setItem('tasks', JSON.stringify(tasks));
  closeToDo();
  searchTask();
}

/**
 * Search for tasks which have the same word in the title or description as the word typed in the search field
 */
function searchTask() {
  let searchedTask = document.getElementById("findTask").value.toLowerCase();
  filteredToDos = [];
  for (let i = 0; i < originalTodos.length; i++) {
    let title = originalTodos[i]["title"].toLowerCase();
    let description = originalTodos[i]["description"].toLowerCase();
    if (title.includes(searchedTask) || description.includes(searchedTask)) {
      filteredToDos.push(originalTodos[i]);
    }
  }
  updateHTML();
}

/**
 * Eventlistener when smth gets typed in the search field
 */
let searchInput = document.getElementById("findTask");
searchInput.addEventListener("input", function () {
  searchTask();
});

/**
 * Opens the edit pages of the selected Task where you can change all the Information saved in the selected Task
 * 
 * @param {number} id - Id of the Selected Task
 */
function editToDo(id) {
  selectedUsers = [];
  assignedUsers = [];
  subtaskIndex = 0;
  let todoDiv = document.getElementById("toDoOpen");
  let todoDivHeight = todoDiv.clientHeight;
  todoDiv.innerHTML = "";
  todoDiv.style.height = todoDivHeight + "px";
  todoDiv.innerHTML = generateEditToDoHtml(id);
  preLoadeEdit(id);
  selectPreAssignedUsers(originalTodos[id]["assigned"]);
  document.getElementById("assign-button-container").classList.add("d-none");
  toggleAssignDropdown();
  selectPriority(originalTodos[id]["prio"]);
  renderSubtasks(originalTodos[id]["subtasks"]);
}

/**
 * saves you made changes to the selected Task in the array
 * 
 * @param {number} id - Id of the Selected Task
 */
async function saveEdit(id) {
  let todo = originalTodos[id];
  todo["title"] = document.getElementById("title").value;
  todo["description"] = document.getElementById("description").value;
  todo["dueDate"] = document.getElementById("date").value;
  todo["assigned"] = assignedUsers;
  todo["prio"] = editPrio;
  todo["subtasks"] = editSubtasks;

  assignedUsers = [];
  selectedUsers = [];
  await setItem('tasks', JSON.stringify(tasks));
  showEdit(id);
}

/**
 * load all information of the selected task when you open the edit page for the task
 * 
 * @param {number} id - Id of the Selected Task
 */
function preLoadeEdit(id) {
  setMinDate();
  initAssignOnclick();
  loadeInputFromTask(id);
  toggleAssignDropdown();
}

/**
 * shows the selected Task with the new informations
 * 
 * @param {number} id  Id of the Selected Task
 */
function showEdit(id) {
  let todo = originalTodos[id];
  let todoDiv = document.getElementById("toDoOpen");
  todoDiv.innerHTML = "";
  todoDiv.style.height = "unset";

  todoDiv.innerHTML = generateShowEditHTML(id, todo);
  formatOpenToDo(todo, id);
}

/**
 * opens an overlay where you can create a new taks 
 * 
 * @param {string} statusTask - Status of the task that will be created
 */
function addTaskOnBoard(statusTask) {
  let originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  assignedUsers = [];
  selectedUsers = [];
  editSubtasks = [];
  subtaskIndex = 0;
  document.getElementById("boradContent").innerHTML += generateAddTaskHTML(statusTask);
  setMinDate();
  initAssignOnclick();
  setTimeout(() => {
    document.getElementById("addTaskOpen").classList.add("showToDoOpen");
  }, 0);
  setTimeout(() => {
    document.body.style.overflow = originalOverflow;
  }, 200);
}

/**
 * closes the overlay to creat a new task
 */
function closeAddTask() {
  let originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.getElementById("addTaskOpen").classList.remove("showToDoOpen");
  setTimeout(() => {
    document.getElementById("addTaskOpenBg").remove();
    updateHTML();
    document.body.style.overflow = originalOverflow;
  }, 200);

}

/**
 * new task gets saved in the tasks array and  displayed on the board
 * 
 * @param {string} statusTask - Status of the task that will be created
 */
async function addTaskBoard(statusTask) {
  let newTask = {
    id: originalTodos.length,
    status: statusTask,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    assigned: assignedUsers,
    dueDate: document.getElementById("date").value,
    prio: addTaskPrio,
    category: document.getElementById("category").value,
    subtasks: editSubtasks,
  };
  originalTodos.push(newTask);
  tasks.push(newTask);
  await setItem('tasks', JSON.stringify(tasks));
  document.getElementById("taskAddedContainer").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("taskAddedContainer").classList.add("d-none");
    closeAddTask();
  }, 700);
}

