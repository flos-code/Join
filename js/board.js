let currentDraggedElement;
let filteredToDos = [];
let originalTodos = todos.slice();

function updateHTML() {
  if (filteredToDos.length !== 0) {
    todos = filteredToDos;
  } else if (document.getElementById("findTask").value) {
    todos = [];
  } else {
    todos = originalTodos.slice(); // Restore original todos if no filter is applied
  }

  // Clear the filteredToDos array
  filteredToDos = [];

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
  todos[currentDraggedElement]["status"] = status;
  updateHTML();
}

function generatePrio(element) {
  let prioDiv = document.getElementById(`toDoPrio${element["id"]}`);
  prioDiv.innerHTML = "";
  if (element["prio"] === "Low") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIcon" viewBox="0 0 21 16">
        <use href="assets/img/icons.svg#lowprio-icon"></use>
        </svg>`;
  } else if (element["prio"] === "Medium") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIcon" viewBox="0 0 21 8">
        <use href="assets/img/icons.svg#mediumprio-icon"></use>
        </svg>`;
  } else if (element["prio"] === "Urgent") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIcon" viewBox="0 0 21 16">
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
  document.getElementById("findTask").value = "";
  let todo = todos[id];
  document.getElementById("boradContent").innerHTML += /*html*/ `
        <div id="toDoOpenBg" onclick="closeToDo()">
            <div class="toDoOpen" onclick="event.stopPropagation()">
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
    <div onclick="editToDo(${id})"class="todoFooterSeparator"></div>
    <div class="editToDo">  <img class="editToDoImg" src="/img/editToDo.svg" alt=""><div>Edit</div></div>
            </div>

            </div>
        </div>
    `;

  setToDoCategoryColor(todo, id);
  setTime(todo, id);
  generateToDoPrio(todo, id);
  generateToDoAssigned(todo, id);
  generateTodSubtask(todo, id);

  // Fuktionen für: subtask render, edit, delete , hover und so
}

function closeToDo() {
  document.getElementById("toDoOpenBg").remove();
  updateHTML();
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
  dateDiv.innerHTML = "";
  timestamp = todo["dueDate"];

  let dateObject = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  let day = String(dateObject.getUTCDate()).padStart(2, "0");
  let month = String(dateObject.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  let year = dateObject.getUTCFullYear();

  let formattedDate = `${day}/${month}/${year}`;
  dateDiv.innerHTML = `${formattedDate}`;
}

function generateToDoPrio(todo, id) {
  let prioDiv = document.getElementById(`toDoOpenPrio${id}`);
  prioDiv.innerHTML = "";
  if (todo["prio"] === "Low") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIcon" viewBox="0 0 21 16">
        <use href="assets/img/icons.svg#lowprio-icon"></use>
        </svg>`;
  } else if (todo["prio"] === "Medium") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIcon" viewBox="0 0 21 8">
        <use href="assets/img/icons.svg#mediumprio-icon"></use>
        </svg>`;
  } else if (todo["prio"] === "Urgent") {
    prioDiv.innerHTML = /*html*/ `
        <svg class="boardPrioIcon" viewBox="0 0 21 16">
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
  let task = todos[id]["subtasks"][i];
  if (task["isDone"]) {
    task["isDone"] = false;
  } else {
    task["isDone"] = true;
  }
}

function deletToDo(id) {
  todos.splice(id, 1);
  for (let i = 0; i < todos.length; i++) {
    todos[i]["id"] = i;
  }
  originalTodos = todos.slice();
  closeToDo();
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
