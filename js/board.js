let currentDraggedElement;
let filteredToDos = [];
let originalTodos = todos.slice();
let editPrio;
let editSubtasks = [];

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function updateHTML() {
  if (filteredToDos.length !== 0) {
    todos = filteredToDos;
  } else if (document.getElementById("findTask").value) {
    todos = [];
  } else {
    todos = originalTodos.slice(); // Restore original todos if no filter is applied
  }

  // Clear the filteredToDos array

  let toDo = todos.filter((t) => t["status"] == "toDo");

  document.getElementById("toDo").innerHTML = "";

  if (toDo.length === 0) {
    document.getElementById("toDo").innerHTML = generateNoTodoHTML("to Do");
  } else {
    for (let index = 0; index < toDo.length; index++) {
      const element = toDo[index];
      document.getElementById("toDo").innerHTML += generateTodoHTML(element);
      setCategoryColor(element);
      generateDescription(element);
      generateSubtask(element);
      generatePrio(element);
      generateAssigned(element);
    }
  }

  let inProgress = todos.filter((t) => t["status"] == "inProgress");

  if (inProgress.length === 0) {
    document.getElementById("inProgress").innerHTML =
      generateNoTodoHTML("in Progress");
  } else {
    document.getElementById("inProgress").innerHTML = "";

    for (let index = 0; index < inProgress.length; index++) {
      const element = inProgress[index];
      document.getElementById("inProgress").innerHTML +=
        generateTodoHTML(element);
      setCategoryColor(element);
      generateDescription(element);
      generateSubtask(element);
      generatePrio(element);
      generateAssigned(element);
    }
  }

  let awaitFeedback = todos.filter((t) => t["status"] == "awaitFeedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  if (awaitFeedback.length === 0) {
    document.getElementById("awaitFeedback").innerHTML =
      generateNoTodoHTML("await Feedback");
  } else {
    for (let index = 0; index < awaitFeedback.length; index++) {
      const element = awaitFeedback[index];
      document.getElementById("awaitFeedback").innerHTML +=
        generateTodoHTML(element);
      setCategoryColor(element);
      generateDescription(element);
      generateSubtask(element);
      generatePrio(element);
      generateAssigned(element);
    }
  }

  let done = todos.filter((t) => t["status"] == "done");

  document.getElementById("done").innerHTML = "";

  if (done.length === 0) {
    document.getElementById("done").innerHTML = generateNoTodoHTML("done");
  } else {
    for (let index = 0; index < done.length; index++) {
      const element = done[index];
      document.getElementById("done").innerHTML += generateTodoHTML(element);
      setCategoryColor(element);
      generateDescription(element);
      generateSubtask(element);
      generatePrio(element);
      generateAssigned(element);
    }
  }
  // filteredToDos = [];
}

function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element) {
  return /*html*/ `
  <div draggable="true" ondragstart="startDragging(${element["id"]})"  onclick="openToDo(${element["id"]})" class="todo" id="todo${element["id"]}">
  <div class="toDoCategory" id="toDoCategory${element["id"]}" >  ${element["category"]}</div>

  <div>
  <div class="toDoTitle"> ${element["title"]} </div>
  <div class="toDoDescription" id="toDoDescription${element["id"]}"></div>
  </div>

  <div class="toDoSubtasks" id="toDoSubtasks${element["id"]}"> 
    <div class="toDoSubtasksProgress">
        <div id="toDoSubtasksProgressFiller${element["id"]}" class="toDoSubtasksProgressFiller"></div>
    </div> 
    <div class="toDoSubtasksCount"> <div id="toDoSubtasksDone${element["id"]}"></div>/${element["subtasks"].length} Subtask</div> 
</div>

  <div class="toDoBottom">
  <div class="toDoAssignedContainer" id="toDoAssigned${element["id"]}"></div>
  <div class="toDoPrio" id="toDoPrio${element["id"]}"></div>
  </div>
  
  </div>`;
}

function generateNoTodoHTML(status) {
  return `<div class="noTask">No tasks ${status}</div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(status) {
  originalTodos[currentDraggedElement]["status"] = status;
  // document.getElementById("findTask").value = "";
  updateHTML();
}

function generatePrio(element) {
  let prioDiv = document.getElementById(`toDoPrio${element["id"]}`);
  prioDiv.innerHTML = "";
  if (element["prio"] === "Low") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIconLow" viewBox="0 0 21 16">
        <use href="assets/img/icons.svg#lowprio-icon"></use>
        </svg>`;
  } else if (element["prio"] === "Medium") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIconMedium" viewBox="0 0 21 8">
        <use href="assets/img/icons.svg#mediumprio-icon"></use>
        </svg>`;
  } else if (element["prio"] === "Urgent") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIconUrgent" viewBox="0 0 21 16">
        <use href="assets/img/icons.svg#urgentprio-icon"></use>
        </svg>
        `;
  } else {
  }
}

function generateAssigned(element) {
  let assignedDiv = document.getElementById(`toDoAssigned${element["id"]}`);
  assignedDiv.innerHTML = "";
  if (element["assigned"].length > 4) {
    let moreAssigned = element["assigned"].length - 4;

    for (let i = 0; i < 4; i++) {
      let user = element["assigned"][i];
      let firstLetter = user["firstName"].charAt(0).toUpperCase();
      let secoundLetter = user["lastName"].charAt(0).toUpperCase();
      let color = user["userColor"];

      assignedDiv.innerHTML += /*html*/ `
<div class="toDoAssigned" style="background-color:${color}"> ${firstLetter}${secoundLetter} </div>`;
    }
    assignedDiv.innerHTML += /*html*/ `
<div class="toDoAssignedMore"> +${moreAssigned} </div>`;
  } else {
    for (let i = 0; i < element["assigned"].length; i++) {
      let user = element["assigned"][i];
      let firstLetter = user["firstName"].charAt(0).toUpperCase();
      let secoundLetter = user["lastName"].charAt(0).toUpperCase();
      let color = user["userColor"];

      assignedDiv.innerHTML += /*html*/ `
    <div class="toDoAssigned" style="background-color:${color}"> ${firstLetter}${secoundLetter} </div>`;
    }
  }
}

function setCategoryColor(element) {
  let categoryDiv = document.getElementById(`toDoCategory${element["id"]}`);
  if (element["category"] === "User Story") {
    categoryDiv.style = "  background-color: #0038ff";
  } else if (element["category"] === "Technical Task") {
    categoryDiv.style = "background-color: #1FD7C1";
  } else {
  }
}

function generateDescription(element) {
  let descriptionDiv = document.getElementById(
    `toDoDescription${element["id"]}`
  );
  let maxCharacters = 50;
  let description = element["description"];

  if (description.length > maxCharacters) {
    // Find the last space within the character limit
    let lastSpaceIndex = description.lastIndexOf(" ", maxCharacters);

    // Truncate the text to the last whole word below the character limit
    description = description.slice(0, lastSpaceIndex) + "...";
  }

  descriptionDiv.innerHTML = `${description}`;
}

function generateSubtask(element) {
  let subtasks = element["subtasks"];
  let subtasksDiv = document.getElementById(`toDoSubtasks${element["id"]}`);
  let trueCount = 0;
  let doneSubtasksDiv = document.getElementById(
    `toDoSubtasksDone${element["id"]}`
  );
  let progessbarFillerDiv = document.getElementById(
    `toDoSubtasksProgressFiller${element["id"]}`
  );
  if (subtasks.length === 0) {
    subtasksDiv.classList.add("d-none");
  } else {
    for (let i = 0; i < subtasks.length; i++) {
      if (subtasks[i]["isDone"]) {
        trueCount++;
      }
    }
    doneSubtasksDiv.innerHTML = `${trueCount}`;
    let fillWidth = 128 * (trueCount / subtasks.length);
    progessbarFillerDiv.style = `width: ${fillWidth}px`;
  }
}

function openToDo(id) {
  let todo = originalTodos[id];
  editPrio = originalTodos[id]["prio"];
  editSubtasks =
    originalTodos[id][
      "subtasks"
    ].slice(); /* only edit the originaltods when clicke ok at bottom of edit page */
  let originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.getElementById("boradContent").innerHTML += /*html*/ `
        <div id="toDoOpenBg" onclick="closeToDo()">
            <div id="toDoOpen" class="toDoOpen" onclick="event.stopPropagation()">
                <div class="toDoOpenHeader">
            <div class="toDoOpenCategory" id="toDoOpenCategory${id}" >  ${todo["category"]}</div>
            <div onclick="closeToDo()">      
                <img class="closeToDo" src="/img/closeToDo.svg" alt="">
            </div>
            </div>
            <div class="toDoOpenTitle" >  ${todo["title"]}</div>
            <div class="toDoOpenDescription" >  ${todo["description"]}</div>
            <div class="toDoOpenDate"><div class="toDoOpenSection">Due date:</div><div id="toDoOpenDate${id}"></div></div>
            <div class="toDoOpenPrio" id="" ><div class="toDoOpenSection">Priority:</div> <div class="toDoOpenPrioText">${todo["prio"]}</div>  <div class="toDoOpenPrioIcon" id="toDoOpenPrio${id}"></div> </div>
          
                <div class="toDoOpenAssignedContainer">
            <div class="toDoOpenSection">Assigned To:</div>
            <div class="toDoOpenAssigned" id="toDoOpenAssigned${id}"></div>
            </div>
             
       
            <div class="toDoOpenSubtasksContainer" >
            <div class="toDoOpenSection">Subtasks</div>
            <div class="toDoOpenSubtasks" id="toDoOpenSubtasks${id}"></div> 
            </div> 
            <div class="todoFooter">

    <div onclick="deletToDo(${id})" class="deleteToDo"><img class="deleteToDoImg" src="/img/deleteToDo.svg" alt=""><div>Delete</div></div>
    <div class="todoFooterSeparator"></div>
    <div onclick="editToDo(${id})" class="editToDo">  <img class="editToDoImg" src="/img/editToDo.svg" alt=""><div>Edit</div></div>
            </div>

            </div>
        </div>
    `;
  setTimeout(() => {
    document.getElementById("toDoOpen").classList.add("showToDoOpen");
  }, 0);
  setTimeout(() => {
    document.body.style.overflow = originalOverflow;
  }, 200); // Adjust the timeout value based on your transition duration

  setToDoCategoryColor(todo, id);
  setTime(todo, id);
  generateToDoPrio(todo, id);
  generateToDoAssigned(todo, id);
  generateTodSubtask(todo, id);
}

function closeToDo() {
  let originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  document.getElementById("toDoOpen").classList.remove("showToDoOpen");

  setTimeout(() => {
    document.getElementById("toDoOpenBg").remove();
    updateHTML();
    document.body.style.overflow = originalOverflow;
  }, 200);
}

function setToDoCategoryColor(todo, id) {
  let categoryDiv = document.getElementById(`toDoOpenCategory${id}`);
  if (todo["category"] === "User Story") {
    categoryDiv.style = "  background-color: #0038ff";
  } else if (todo["category"] === "Technical Task") {
    categoryDiv.style = "background-color: #1FD7C1";
  } else {
  }
}

function setTime(todo, id) {
  let dateDiv = document.getElementById(`toDoOpenDate${id}`);
  let inputDateString = todo["dueDate"];
  dateDiv.innerHTML = "";
  let inputDate = new Date(inputDateString);

  let day = inputDate.getDate().toString().padStart(2, "0");
  let month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  let year = inputDate.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;
  dateDiv.innerHTML = `${formattedDate}`;
}

function generateToDoPrio(todo, id) {
  let prioDiv = document.getElementById(`toDoOpenPrio${id}`);
  prioDiv.innerHTML = "";
  if (todo["prio"] === "Low") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIconLow" viewBox="0 0 21 16">
        <use href="assets/img/icons.svg#lowprio-icon"></use>
        </svg>`;
  } else if (todo["prio"] === "Medium") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIconMedium" viewBox="0 0 21 8">
        <use href="assets/img/icons.svg#mediumprio-icon"></use>
        </svg>`;
  } else if (todo["prio"] === "Urgent") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIconUrgent" viewBox="0 0 21 16">
        <use href="assets/img/icons.svg#urgentprio-icon"></use>
        </svg>
        `;
  } else {
  }
}

function generateToDoAssigned(todo, id) {
  let assignedDiv = document.getElementById(`toDoOpenAssigned${id}`);
  assignedDiv.innerHTML = "";
  for (let i = 0; i < todo["assigned"].length; i++) {
    let user = todo["assigned"][i];
    let firstName = user["firstName"];
    let lastName = user["lastName"];
    let firstLetter = firstName.charAt(0).toUpperCase();
    let secoundLetter = lastName.charAt(0).toUpperCase();
    let color = user["userColor"];
    let isYou = "";
    if (user["isYou"]) {
      isYou = "(You)";
    }

    assignedDiv.innerHTML += /*html*/ `
    <div class="toDoOpenUserAssigned">
      <div class="toDoOpenCircleAssigned" style="background-color:${color}"> ${firstLetter}${secoundLetter} </div>
      <div class="toDoOpenNameAssigned">${firstName} ${lastName} ${isYou}</div>
      </div>`;
  }
}

function generateTodSubtask(todo, id) {
  let subtasks = todo["subtasks"];
  let subtasksDiv = document.getElementById(`toDoOpenSubtasks${id}`);
  subtasksDiv.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    let task = subtasks[i];
    let description = task["taskDescription"];
    let isChecked = "";

    if (task["isDone"]) {
      isChecked = "checked";
    }
    subtasksDiv.innerHTML += /*html*/ `
    <label class="customCheckbox">
        <input type="checkbox" id="taskCheckbox${i}" ${isChecked} onclick="updateSubtask(${id}, ${i})">
        <span class="customCheckmark">
            <svg class="uncheckedSvg" viewBox="0 0 21 16">
                <use href="assets/img/icons.svg#checkbox-unchecked"></use>
            </svg>
            <svg class="checkedSvg" viewBox="0 0 21 16">
                <use href="assets/img/icons.svg#checkbox-checked"></use>
            </svg>
        </span>
${description}
    </label>
 `;
  }
}

function updateSubtask(id, i) {
  let task = originalTodos[id]["subtasks"][i];
  if (task["isDone"]) {
    task["isDone"] = false;
  } else {
    task["isDone"] = true;
  }
}

function deletToDo(id) {
  originalTodos.splice(id, 1);
  for (let i = 0; i < originalTodos.length; i++) {
    originalTodos[i]["id"] = i;
  }

  // if (filteredToDos.length === 1) {
  //   //when deliting while searching
  //   document.getElementById("findTask").value = "";
  //   filteredToDos = [];
  // }
  // originalTodos = todos.slice();
  closeToDo();
  searchTask(); //when deliting while searching
}

function searchTask() {
  let searchedTask = document.getElementById("findTask").value.toLowerCase();
  filteredToDos = []; // Clear the filtered todos array

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
  let todoDiv = document.getElementById("toDoOpen");
  let todoDivHeight = todoDiv.clientHeight;

  todoDiv.innerHTML = "";
  todoDiv.style.height = todoDivHeight + "px";

  todoDiv.innerHTML = /*html*/ `

     
                <img onclick="closeToDo()" class="closeToDo closeToDoEdit" src="/img/closeToDo.svg" alt="">
          

<div class="editToDoDiv">
<form id="editFrom" onsubmit="saveEdit('${id}'); return false">
<div class="task-input-container">
                            <label class="task-form-label" for="title">
                                Title
                            </label>
                            <input class="task-form-input" type="text" name="title" id="title" placeholder="Enter a title"
                                required>
                            <label class="task-form-label" for="description">Description</label>
                            <div class="task-form-text-wrapper">
                                <textarea class="task-form-text" name="text" id="description" placeholder="Enter a Description"
                                
                              ></textarea>
                                <svg class="task-form-resize-icon"><use href="assets/img/icons.svg#resize-icon"></use></svg>
                            </div>
                            <label class="task-form-label" for="date">
                                Due date
                            </label>
                            <input class="task-form-date" type="date" name="date" id="date" max="2025-12-31" required>
                            
                            <label class="task-form-label" for="assign">Assigned to</label>
                            <div class="task-dropdown-container">
                                <span id="arrow-assign" class="task-arrow-dropdown" onclick="toggleAssignDropdown()">
                                    <svg viewBox="0 0 8 5">
                                        <use href="assets/img/icons.svg#arrow-icon"></use>
                                    </svg>
                                </span>
                                <input class="task-assign" id="assign" type="text"  name="assign" value="Select contacts to assign" onclick="toggleAssignDropdown()">
                                <div id="assign-content"></div>
                            </div>
                      
                            <div class="task-form-label">Prio</div>
                            <div class="task-form-prio">
                                <div class="task-form-btn" id="urgent-btn" onclick="selectPrioButton('urgent-btn'); changePrio('Urgent')">Urgent
                                    <svg class="task-form-urgent-icon" viewBox="0 0 21 16">
                                        <use href="assets/img/icons.svg#urgentprio-icon"></use>
                                    </svg>
                                </div>
                                <div class="task-form-btn" id="medium-btn" onclick="selectPrioButton('medium-btn'); changePrio('Medium')">Medium
                                    <svg class="task-form-medium-icon" viewBox="0 0 21 8">
                                        <use href="assets/img/icons.svg#mediumprio-icon"></use>
                                    </svg>
                                </div>
                                <div class="task-form-btn" id="low-btn" onclick="selectPrioButton('low-btn'); changePrio('Low')">Low
                                    <svg class="task-form-low-icon" viewBox="0 0 21 16">
                                        <use href="assets/img/icons.svg#lowprio-icon"></use>
                                    </svg>
                                </div>
                            </div>
                            <label class="task-form-label" for="subtasks">Subtasks</label>
                            <div class="task-form-subtasks" id="subtasks-container">
                                <input class="task-form-input m-b05" type="text" name="subtasks" id="subtasks"
                                    placeholder="Add new subtask">
                                <div onclick="addSubtaskEdit()">
                                    <svg class="task-form-add-icon" id="task-add-icon" viewBox="0 0 15 14">
                                        <use href="assets/img/icons.svg#add-icon"></use>
                                    </svg>
                                </div>
                            </div>

    </div>
</div>
</form>
<button type="submit" class="savedEdit" form="editFrom">
Ok
<img src="img/saveEditBoard.svg" alt="">

</button>



  `;

  loadeInputFromTask(id);

  if (originalTodos[id]["prio"] === "Urgent") {
    selectPrioButton("urgent-btn");
  } else if (originalTodos[id]["prio"] === "Medium") {
    selectPrioButton("medium-btn");
  } else if (originalTodos[id]["prio"] === "Low") {
    selectPrioButton("low-btn");
  } else {
  }

  let subtasksContainer = document.getElementById("subtasks-container");
  let subtask = originalTodos[id]["subtasks"];
  for (let index = 0; index < subtask.length; index++) {
    let subtaskField = subtask[index]["taskDescription"];
    subtasksContainer.innerHTML += editSubtaskHTML(subtaskField, index);
    subtaskIndex++;
  }
}

function loadeInputFromTask(id) {
  document.getElementById("title").value = originalTodos[id]["title"];
  document.getElementById("description").value =
    originalTodos[id]["description"];
  document.getElementById("date").value = originalTodos[id]["dueDate"];
}

function saveEdit(id) {
  let todo = originalTodos[id];
  todo["title"] = document.getElementById("title").value;
  todo["description"] = document.getElementById("description").value;
  todo["dueDate"] = document.getElementById("date").value;
  todo["prio"] = editPrio;
  todo["subtasks"] = editSubtasks;

  showEdit(id);
}

function showEdit(id) {
  let todo = originalTodos[id];
  let todoDiv = document.getElementById("toDoOpen");
  todoDiv.innerHTML = "";
  todoDiv.style.height = "unset";

  todoDiv.innerHTML = /*html*/ `
   <div class="toDoOpenHeader">
            <div class="toDoOpenCategory" id="toDoOpenCategory${id}" >  ${todo["category"]}</div>
            <div onclick="closeToDo()">      
                <img class="closeToDo" src="/img/closeToDo.svg" alt="">
            </div>
            </div>
            <div class="toDoOpenTitle" >  ${todo["title"]}</div>
            <div class="toDoOpenDescription" >  ${todo["description"]}</div>
            <div class="toDoOpenDate"><div class="toDoOpenSection">Due date:</div><div id="toDoOpenDate${id}"></div></div>
            <div class="toDoOpenPrio" id="" ><div class="toDoOpenSection">Priority:</div> <div class="toDoOpenPrioText">${todo["prio"]}</div>  <div class="toDoOpenPrioIcon" id="toDoOpenPrio${id}"></div> </div>
          
                <div class="toDoOpenAssignedContainer">
            <div class="toDoOpenSection">Assigned To:</div>
            <div class="toDoOpenAssigned" id="toDoOpenAssigned${id}"></div>
            </div>
             
       
            <div class="toDoOpenSubtasksContainer" >
            <div class="toDoOpenSection">Subtasks</div>
            <div class="toDoOpenSubtasks" id="toDoOpenSubtasks${id}"></div> 
            </div> 
            <div class="todoFooter">

    <div onclick="deletToDo(${id})" class="deleteToDo"><img class="deleteToDoImg" src="/img/deleteToDo.svg" alt=""><div>Delete</div></div>
    <div class="todoFooterSeparator"></div>
    <div onclick="editToDo(${id})" class="editToDo">  <img class="editToDoImg" src="/img/editToDo.svg" alt=""><div>Edit</div></div>
            </div>`;

  setToDoCategoryColor(todo, id);
  setTime(todo, id);
  generateToDoPrio(todo, id);
  generateToDoAssigned(todo, id);
  generateTodSubtask(todo, id);
}

function changePrio(selectedPrio) {
  editPrio = selectedPrio;
}

function addSubtaskEdit() {
  let subtasksContainer = document.getElementById("subtasks-container");
  let subtaskField = document.getElementById("subtasks").value;

  if (subtaskField) {
    subtasksContainer.innerHTML += editSubtaskHTML(subtaskField, subtaskIndex);
    subtaskIndex++;
    let newSubtask = {
      taskDescription: subtaskField,
      isDone: false,
    };
    editSubtasks.push(newSubtask);
  }
}

function editSubtaskHTML(subtaskField, index) {
  return /*html*/ `
      <div class="subtask-item" id="subtask-item${index}">
          <div class="subtask-info">
              <span>&#x2022</span>
              <span id="subtask-input${index}">${subtaskField}</span>
          </div>
          <div class="subtask-icon-container">
              <div onclick="editTextSubtask(${index})">
                  <svg class="subtask-edit-icon"><use href="assets/img/icons.svg#edit-icon"></use></svg>
              </div>
              <span class="subtask-separator"></span>
              <div onclick="editdeleteSubtask(${index})">
                  <svg class="subtask-delete-icon"><use href="assets/img/icons.svg#delete-icon"></use></svg>
              </div>
          </div>
      </div>
  `;
}

function editTextSubtask(index) {
  /* also change isture when edeting? */
  let subtaskSpan = document.getElementById(`subtask-input${index}`);
  let inputElement = document.createElement("input");

  if (document.getElementById(`subtask-text${index}`)) {
    document.getElementById(`subtask-text${index}`).focus();
  } else {
    inputElement.value = subtaskSpan.innerText;
    inputElement.name = "subtask";
    inputElement.type = "text";
    inputElement.className = "subtask-text";
    inputElement.id = `subtask-text${index}`;

    inputElement.addEventListener("input", function () {
      editSubtasks[index]["taskDescription"] = inputElement.value;
    });

    subtaskSpan.parentNode.replaceChild(inputElement, subtaskSpan);
    inputElement.focus();
  }
}

function editdeleteSubtask(index) {
  let subtaskItem = document.getElementById(`subtask-item${index}`);
  subtaskItem.remove();
  editSubtasks.splice(index, 1);
}
