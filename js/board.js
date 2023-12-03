let currentDraggedElement;
let filteredToDos = [];
let originalTodos = [];
let editPrio;
let editSubtasks = [];
let addTaskPrio;
let addTaskStatus;

async function initBoard() {
  await includeHTML();
  await loadTasks();
  await loadUsers();
  todos = tasks;
  originalTodos = todos.slice();
  await updateHTML();
}


async function updateHTML() {
  updateSection("toDo", "toDoStatus", "to Do");
  updateSection("inProgress", "inProgressStatus", "in Progress");
  updateSection("awaitFeedback", "awaitFeedbackStatus", "await Feedback");
  updateSection("done", "doneStatus", "done");
}


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

function filterTasksByStatus(status) {
  if (filteredToDos.length !== 0) {
    return filteredToDos.filter((t) => t["status"] == status);
  } else if (document.getElementById("findTask").value) {
    return [];
  } else {
    return originalTodos.filter((t) => t["status"] == status);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}



function allowDrop(ev) {
  ev.preventDefault();
}


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

let searchInput = document.getElementById("findTask");
searchInput.addEventListener("input", function () {
  searchTask();
});


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

function showEdit(id) {
  let todo = originalTodos[id];
  let todoDiv = document.getElementById("toDoOpen");
  todoDiv.innerHTML = "";
  todoDiv.style.height = "unset";

  todoDiv.innerHTML = generateShowEditHTML(id, todo);
  formatOpenToDo(todo, id);
}


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

