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
  if (element["prio"] === "Low") {
    prioDiv.classList.add("prioLow");
  } else if (element["prio"] === "Medium") {
    prioDiv.classList.add("prioMedium");
  } else if (element["prio"] === "Urgent") {
    prioDiv.classList.add("prioUrgent");
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
            <div class="" id="" >  ${todo["category"]}</div>
            <div onclick="closeToDo()">x close todo</div>
            <div class="toDoOpenTitle" >  ${todo["title"]}</div>
            <div class="toDoOpenDescription" >  ${todo["description"]}</div>
            <div class="" id="" ><div class="toDoOpenSection">Due date:</div>  ${todo["dueDate"]}</div>
            <div class="" id="" ><div class="toDoOpenSection">Priority:</div>  ${todo["prio"]} prioimg</div>
            <div class="" id="">
            <div class="toDoOpenSection">Assigned To:</div>
             
            </div>
            <div class="" id="">
            <div class="toDoOpenSection">Subtasks</div>
                
            </div>
            <div> delete und edit</div>

            </div>
        </div>
    `;

  // Fuktionen für: cartegory Hintergundfrarbe, duedate datumumwandlun, prio bild, assigne render, subtask render
}

function closeToDo() {
  document.getElementById("toDoOpenBg").remove();
}
