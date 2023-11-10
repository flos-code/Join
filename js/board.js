let currentDraggedElement;

function updateHTML() {
  let toDo = todos.filter((t) => t["status"] == "toDo");

  document.getElementById("toDo").innerHTML = "";

  if (toDo.length === 0) {
    document.getElementById("toDo").innerHTML = generateNoTodoHTML("to Do");
  } else {
    for (let index = 0; index < toDo.length; index++) {
      const element = toDo[index];
      document.getElementById("toDo").innerHTML += generateTodoHTML(element);
      setCategoryColor(element);
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
  <div draggable="true" ondragstart="startDragging(${element["id"]})"  onclick="openToDo(${element["id"]})" class="todo">
  <div class="toDoCategory" id="toDoCategory${element["id"]}" >  ${element["category"]}</div>

  <div>
  <div class="toDoTitle"> ${element["title"]} </div>
  <div class="toDoDescription"> ${element["description"]} </div>
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
  return `<div>No tasks ${status}</div>`;
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
  for (let i = 0; i < element["assigned"].length; i++) {
    let user = element["assigned"][i];
    let firstLetter = user["firstName"].charAt(0).toUpperCase();
    let secoundLetter = user["lastName"].charAt(0).toUpperCase();
    let color = user["userColor"];

    assignedDiv.innerHTML += /*html*/ `
    <div class="toDoAssigned" style="background-color:${color}"> ${firstLetter}${secoundLetter} </div>`;
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
  let todo = todos[id];
  document.getElementById("boradContent").innerHTML += /*html*/ `
        <div id="toDoOpenBg" onclick="closeToDo()">
            <div class="toDoOpen" onclick="event.stopPropagation()">
                <div class="toDoOpenHeader">
            <div class="toDoOpenCategory" id="toDoOpenCategory${id}" >  ${todo["category"]}</div>
            <div onclick="closeToDo()">x</div>
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
            <div> delete und edit</div>

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
    let done = "";
    if (task["isDone"]) {
      done = "checked";
    }
    subtasksDiv.innerHTML += /*html*/ `
    <label class="container">${description}
  <input type="checkbox" checked="${done}">
  <span class="checkmark"></span>
</label>
 `;
  }
}
