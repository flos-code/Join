function formatTask(element) {
    setCategoryColor(element);
    generateDescription(element);
    generateSubtask(element);
    generatePrio(element);
    generateAssigned(element);
}

function generateNoTodoHTML(status) {
    return `<div class="noTask">No tasks ${status}</div>`;
}

function generatePrio(element) {
    let priorityObj = {
        Low: "boardPrioIconLow",
        Medium: "boardPrioIconMedium",
        Urgent: "boardPrioIconUrgent",
    };
    let prioDiv = document.getElementById(`toDoPrio${element["id"]}`);
    prioDiv.innerHTML = "";
    let priority = element["prio"];
    if (priority && priorityObj[priority]) {
        prioDiv.innerHTML = generateprioHTML(priorityObj, priority);
    }
}

function generateAssigned(element) {
    let assignedDiv = document.getElementById(`toDoAssigned${element["id"]}`);
    assignedDiv.innerHTML = "";
    let maxAssigned = 4;
    let assignedUsers = element["assigned"];
    let totalAssigned = assignedUsers.length;
    for (let i = 0; i < Math.min(maxAssigned, totalAssigned); i++) {
        let user = assignedUsers[i];
        let firstLetter = user["firstName"].charAt(0).toUpperCase();
        let secondLetter = user["lastName"].charAt(0).toUpperCase();
        let color = user["userColor"];
        assignedDiv.innerHTML += generateAssignedUserHTML(firstLetter, secondLetter, color);
    }
    if (totalAssigned > maxAssigned) {
        let moreAssigned = totalAssigned - maxAssigned;
        assignedDiv.innerHTML += generateMoreAssignedHTML(moreAssigned);
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
        let lastSpaceIndex = description.lastIndexOf(" ", maxCharacters);
        description = description.slice(0, lastSpaceIndex) + "...";
    }
    descriptionDiv.innerHTML = `${description}`;
}


function generateSubtask(element) {
    let subtasks = element["subtasks"];
    let subtasksDiv = document.getElementById(`toDoSubtasks${element["id"]}`);
    let doneSubtasksDiv = document.getElementById(`toDoSubtasksDone${element["id"]}`);
    let progessbarFillerDiv = document.getElementById(`toDoSubtasksProgressFiller${element["id"]}`);

    if (subtasks.length === 0) {
        subtasksDiv.classList.add("d-none");
    } else {
        updateProgressBar(subtasks, doneSubtasksDiv, progessbarFillerDiv);
    }
}

function updateProgressBar(subtasks, doneSubtasksDiv, progessbarFillerDiv) {
    let trueCount = 0;
    for (let i = 0; i < subtasks.length; i++) {
        if (subtasks[i]["isDone"]) {
            trueCount++;
        }
    }
    let barWidth = document.querySelector('.toDoSubtasksProgress').offsetWidth;
    doneSubtasksDiv.innerHTML = `${trueCount}`;
    let fillWidth = barWidth * (trueCount / subtasks.length);
    progessbarFillerDiv.style.width = `${fillWidth}px`;
}

function formatOpenToDo(todo, id) {
    setToDoCategoryColor(todo, id);
    setTime(todo, id);
    generateToDoPrio(todo, id);
    generateToDoAssigned(todo, id);
    generateTodSubtask(todo, id);
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

    let priorityObj = {
        Low: "boardPrioIconLow",
        Medium: "boardPrioIconMedium",
        Urgent: "boardPrioIconUrgent",
    };

    let priority = todo["prio"];
    if (priority && priorityObj[priority]) {
        prioDiv.innerHTML = /*html*/ `
        <svg class="${priorityObj[priority]}" viewBox="0 0 21 ${priority === "Medium" ? 8 : 16}">
          <use href="assets/img/icons.svg#${priority.toLowerCase()}prio-icon"></use>
        </svg>`;
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
        assignedDiv.innerHTML += generateAssignedHTML(color, firstLetter, secoundLetter, firstName, lastName, isYou);
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
        subtasksDiv.innerHTML += generateSubtaskHTML(i, isChecked, id, description);
    }
}

async function updateSubtask(id, i) {
    let task = originalTodos[id]["subtasks"][i];
    if (task["isDone"]) {
        task["isDone"] = false;
    } else {
        task["isDone"] = true;
    }
    await setItem('tasks', JSON.stringify(tasks));
}

function renderSubtasks(subtasks) {
    let subtasksContainer = document.getElementById("subtasks-container");
    for (let index = 0; index < subtasks.length; index++) {
        let subtaskField = subtasks[index]["taskDescription"];
        subtasksContainer.innerHTML += editSubtaskHTML(subtaskField, subtaskIndex);
        subtaskIndex++;
    }
}

function selectPreAssignedUsers(preAssignedUsers) {
    if (preAssignedUsers) {
        for (let i = 0; i < preAssignedUsers.length; i++) {
            let userID = preAssignedUsers[i]["userID"];
            let user = document.getElementById(`assign-contact${userID}`);
            if (user && !user.classList.contains('assign-contact-selected')) {
                selectContact(userID);
            }
        }
    }
}

function selectPriority(prio) {
    if (prio === "Urgent") {
        selectPrioButton("urgent-btn");
    } else if (prio === "Medium") {
        selectPrioButton("medium-btn");
    } else if (prio === "Low") {
        selectPrioButton("low-btn");
    }
}


function preLoadeEdit(id) {
    setMinDate();
    initAssignOnclick();
    loadeInputFromTask(id);
    toggleAssignDropdown();
}

function loadeInputFromTask(id) {
    document.getElementById("title").value = originalTodos[id]["title"];
    document.getElementById("description").value =
        originalTodos[id]["description"];
    document.getElementById("date").value = originalTodos[id]["dueDate"];
}

function changePrio(selectedPrio) {
    editPrio = selectedPrio;
}

function addSubtaskEdit() {
    let subtasksContainer = document.getElementById("subtasks-container");
    let subtaskField = document.getElementById("subtasks");
    if (subtaskField.value) {
        subtasksContainer.innerHTML += editSubtaskHTML(
            subtaskField.value,
            subtaskIndex
        );
        subtaskIndex++;
        let newSubtask = {
            taskDescription: subtaskField.value,
            isDone: false,
        };
        editSubtasks.push(newSubtask);
        subtaskField.value = "";
    }
}


function editTextSubtask(index) {
    let subtaskSpan = document.getElementById(`subtask-input${index}`);
    if (subtaskSpan.contentEditable !== "true") {
        subtaskSpan.contentEditable = "true";
        subtaskSpan.focus();
        document.getElementById(`subtask-icons${index}`).innerHTML =
            subtaskEditHTML(index);
        subtaskSpan.addEventListener("input", function () {
            editSubtasks[index]["taskDescription"] = subtaskSpan.textContent;
        });
    }
}

function stopEditingSubtask(index) {
    let subtaskSpan = document.getElementById(`subtask-input${index}`);
    if (subtaskSpan.isContentEditable) {
        subtaskSpan.contentEditable = false;
        document.getElementById(`subtask-icons${index}`).innerHTML =
            subtaskEditDefaultHTML(index);
    }
}

function editdeleteSubtask(index) {
    let subtaskItem = document.getElementById(`subtask-item${index}`);
    subtaskItem.remove();
    editSubtasks.splice(index, 1);
    subtaskIndex--;
}

function setAddTaskPrio(prio) {
    addTaskPrio = prio;
}