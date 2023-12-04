/**
 * calls all functions to fromat the selected Task
 * 
 * @param {object} element - Selected Task Object
 */
function formatTask(element) {
    setCategoryColor(element);
    generateDescription(element);
    generateSubtask(element);
    generatePrio(element);
    generateAssigned(element);
}

/**
 * return html when there is no task for the selcted status
 * 
 * @param {string} status - Status of the selected Task
 * @returns  string with the html
 */
function generateNoTodoHTML(status) {
    return `<div class="noTask">No tasks ${status}</div>`;
}

/**
 * generated the prio for the selected Task
 * 
 * @param {object} element - Selected Task Object
 */
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

/**
 * generate the html for the assigned useres of the selected task
 * 
 * @param {object} element - Selected Task Object
 */
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

/**
 * sets the color depending of the catagory of the selected Task
 * 
 * @param {object} element - Selected Task Object
 */
function setCategoryColor(element) {
    let categoryDiv = document.getElementById(`toDoCategory${element["id"]}`);
    if (element["category"] === "User Story") {
        categoryDiv.style = "  background-color: #0038ff";
    } else if (element["category"] === "Technical Task") {
        categoryDiv.style = "background-color: #1FD7C1";
    } else {
    }
}

/**
 * generates the html with the description of the selected task
 *  
 * @param {object} element - Selected Task Object
 */
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

/**
 * generate the html with the subtask of the selected task
 * 
 * @param {object} element - Selected Task Object
 */
function generateSubtask(element) {
    let subtasks = element["subtasks"];
    let subtasksDiv = document.getElementById(`toDoSubtasks${element["id"]}`);
    let doneSubtasksDiv = document.getElementById(`toDoSubtasksDone${element["id"]}`);
    let progessbarFillerDiv = document.getElementById(`toDoSubtasksProgressFiller${element["id"]}`);

    if (subtasks.length === 0) {
        subtasksDiv.classList.add("d-none");
    } else {
        updateProgressBar(subtasks, doneSubtasksDiv, progessbarFillerDiv);
        let trueCount = 0;
        for (let i = 0; i < subtasks.length; i++) {
            if (subtasks[i]["isDone"]) {
                trueCount++;
            }
        }
        let barWidth = 100;
        doneSubtasksDiv.innerHTML = `${trueCount}`;
        let fillWidth = barWidth * (trueCount / subtasks.length);
        progessbarFillerDiv.style.width = `${fillWidth}px`;
    }

}

/**
 * updtaes the progressbar for the subtask
 * 
 * @param {object} subtasks - subtaks object with discription and status of the subtask
 * @param {html element} doneSubtasksDiv - div to display the subtask
 * @param {html element} progessbarFillerDiv - div for the prograssbar of the subtask
 */
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

/**
 * calls all functions to format the selected task
 * 
 * @param {object} todo - Selected Task form the Tasks array
 * @param {number} id - Id of the Selected Task
 */
function formatOpenToDo(todo, id) {
    setToDoCategoryColor(todo, id);
    setTime(todo, id);
    generateToDoPrio(todo, id);
    generateToDoAssigned(todo, id);
    generateTodSubtask(todo, id);
}

/**
 * sets the color depending of the catagory of the selected Task
 * 
 * @param {object} todo - Selected Task form the Tasks array
 * @param {number} id - Id of the Selected Task
 */
function setToDoCategoryColor(todo, id) {
    let categoryDiv = document.getElementById(`toDoOpenCategory${id}`);
    if (todo["category"] === "User Story") {
        categoryDiv.style = "  background-color: #0038ff";
    } else if (todo["category"] === "Technical Task") {
        categoryDiv.style = "background-color: #1FD7C1";
    } else {
    }
}


/**
 * sets the time of the due date for the selcted task
 * 
 * @param {object} todo - Selected Task form the Tasks array
 * @param {number} id - Id of the Selected Task
 */
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

/**
 * sets the prio of the selected task
 * 
 * @param {object} todo - Selected Task form the Tasks array
 * @param {number} id - Id of the Selected Task
 */
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

/**
 * generate the html for the assigned useres
 * 
 * @param {object} todo - Selected Task form the Tasks array
 * @param {number} id - Id of the Selected Task
 */
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

/**
 * generate the subtasks of the selected task
 * 
 * @param {object} todo - Selected Task form the Tasks array
 * @param {number} id - Id of the Selected Task
 */
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

/**
 * change the status of the selected subtask
 * 
 * @param {object} todo - Selected Task form the Tasks array
 * @param {number} id - Id of the Selected Task
 */
async function updateSubtask(id, i) {
    let task = originalTodos[id]["subtasks"][i];
    if (task["isDone"]) {
        task["isDone"] = false;
    } else {
        task["isDone"] = true;
    }
    await setItem('tasks', JSON.stringify(tasks));
}

/**
 * generate all subtaks for the selected taks
 * 
 * @param {object} subtasks - subtaks object with discription and status of the subtask
 */
function renderSubtasks(subtasks) {
    let subtasksContainer = document.getElementById("subtasks-container");
    for (let index = 0; index < subtasks.length; index++) {
        let subtaskField = subtasks[index]["taskDescription"];
        subtasksContainer.innerHTML += editSubtaskHTML(subtaskField, subtaskIndex);
        subtaskIndex++;
    }
}

/**
 * pre slectes all allready assigned useres for a task when you edit the task
 * 
 * @param {object} preAssignedUsers - object with all users which are assigned to the slected task
 */
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

/**
 * pre selects the prio when you edit the task
 * 
 * @param {string} prio - prio of the slected task
 */
function selectPriority(prio) {
    if (prio === "Urgent") {
        selectPrioButton("urgent-btn");
    } else if (prio === "Medium") {
        selectPrioButton("medium-btn");
    } else if (prio === "Low") {
        selectPrioButton("low-btn");
    }
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
 * displaes the information of the selected task when you edit the task
 * 
 * @param {number} id - Id of the Selected Task
 */
function loadeInputFromTask(id) {
    document.getElementById("title").value = originalTodos[id]["title"];
    document.getElementById("description").value =
        originalTodos[id]["description"];
    document.getElementById("date").value = originalTodos[id]["dueDate"];
}

/**
 * chnages the prio of the selected task to the selected prio
 * 
 * @param {string} selectedPrio - prio which is selected
 */
function changePrio(selectedPrio) {
    editPrio = selectedPrio;
}

/**
 * adds a new subtask to the selected task
 */
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

/**
 * edit the text of the selected subtask
 * 
 * @param {number} index - number of the selected subtask
 */
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

/**
 * the text form the subtask can no longer be edited
 * 
 * @param {number} index - number of the selected subtask
 */
function stopEditingSubtask(index) {
    let subtaskSpan = document.getElementById(`subtask-input${index}`);
    if (subtaskSpan.isContentEditable) {
        subtaskSpan.contentEditable = false;
        document.getElementById(`subtask-icons${index}`).innerHTML =
            subtaskEditDefaultHTML(index);
    }
}

/**
 * deletes the selected subtask
 * 
 * @param {number} index - number of the selected subtask
 */
function editdeleteSubtask(index) {
    let subtaskItem = document.getElementById(`subtask-item${index}`);
    subtaskItem.remove();
    editSubtasks.splice(index, 1);
    subtaskIndex--;
}

/**
 * selects the prio for the new task wehn you add a task to the board
 * 
 * @param {string} prio - selected prio
 */
function setAddTaskPrio(prio) {
    addTaskPrio = prio;
}