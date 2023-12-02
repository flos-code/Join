let tasks = [];
let users = [];
let subtaskIndex = 0;
let selectedUsers = []; 
let assignedUsers = [];
let assignInput, assignDropdown;


/**
 * initialize important functions after body loaded
 */
async function init() {
    await includeHTML();
    await loadTasks();
    await loadUsers();
    initAssignOnclick();
    setMinDate();
}


/**
 * fetch all tasks from server to tasks variable
 */
async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch(e) {
        console.error('Loading Tasks error:', e);
    }
}


/**
 * fetch all users from server to users variable
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e) {
        console.error('Loading Users error: ', e);
    }
}


/**
 * push all input values to variable, then send POST request to server
 */
async function addTask() {
    showLoader();
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const date = document.getElementById('date');
    const category = document.getElementById('category');
    tasks.push({
        title: title.value,
        description: description.value,
        assigned: getSelectedUsers(),
        dueDate: date.value,
        prio: modifyPrioString(),
        category: category.value,
        subtasks: getSubtasks(),
        status: "toDoStatus",
        id: tasks.length,
    });

    await setItem('tasks', JSON.stringify(tasks));
    resetForm();
    removeLoader();
    success();
}


/**
 * loader animation during loading of addTask() process
 */
function showLoader() {
    const loader = document.getElementById('loader');
    const overlay = document.getElementById('loader-overlay');
    loader.classList.add('loader');
    overlay.classList.remove('d-none');
}


/**
 * remove loader animation after POST request for all values
 */
function removeLoader() {
    const loader = document.getElementById('loader');
    const overlay = document.getElementById('loader-overlay');
    loader.classList.remove('loader');
    overlay.classList.add('d-none');
}


/**
 * show success message for submitting the form, then forward to summary
 */
function success() {
    const successElement = document.getElementById('success');
    successElement.classList.remove('d-none');
    setTimeout(() => {
        window.open('board.html', '_self');
    }, 1500);
}


/**
 * reset all input fields and set whole form to default
 */
function resetForm() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const date = document.getElementById('date');
    const category = document.getElementById('title');

    title.value = '';
    description.value = '';
    resetSelectedUsers();
    date.value = '';
    resetPrioButton();
    category.value = '';
    resetSubtasks(); 
    resetCategory();
    removeInitials();
}


/**
 * empty selectedUsers, assignedUsers array and remove highlighting of selected user in dropdown menu
 */
function resetSelectedUsers() {
    selectedUsers = [];
    assignedUsers = [];
    const usersDiv = document.querySelectorAll('.assign-contact')
    assignDropdown = document.getElementById('assign-content');
    assignInput = document.getElementById('assign');
    closeAssignDropdown();

    for (const userDiv of usersDiv) {
        if (userDiv.classList.contains('assign-contact-selected'))
        userDiv.classList.remove('assign-contact-selected');
        userDiv.children[1].innerHTML = `
            <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
        `;
    }
}


/**
 * unselect selected prio buttons
 */
function resetPrioButton() {
    const lowButton = document.getElementById('low-btn');
    const mediumButton = document.getElementById('medium-btn');
    const urgentButton = document.getElementById('urgent-btn');
    const buttons = [lowButton, mediumButton, urgentButton];

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.className.includes('active')) {
            button.classList.remove(`${button.id}-active`);
            document.querySelector(`.task-form-${button.id.split('-')[0]}-icon`).classList.remove('f-white');
        }
    }
}


/**
 * remove existing subtasks and set global variable to 0
 */
function resetSubtasks() {
    subtaskIndex = 0;
    const subtasksItems = document.querySelectorAll('.subtask-item');
    for (const subtaskItem of subtasksItems) {
        subtaskItem.remove();
    }
}


/**
 * set category input value to default
 */
function resetCategory() {
    const categoryInputField = document.getElementById('category');
    categoryInputField.value = 'Select task category';
    closeCategoryDropdown();
}


/**
 * remove existing initials
 */
 function removeInitials() {
    const initialsContainer = document.getElementById('initials-container');
    if (initialsContainer) {
        initialsContainer.remove();
    }
}


/**
 * select the clicked button and unselect other buttons if any
 * @param {string} buttonID - id of the selected button is passed
 */
function selectPrioButton(buttonID) {
    const selectedButton = document.getElementById(buttonID);
    const lowButton = document.getElementById('low-btn');
    const mediumButton = document.getElementById('medium-btn');
    const urgentButton = document.getElementById('urgent-btn');
    const buttons = [lowButton, mediumButton, urgentButton];

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button !== selectedButton) {
            button.classList.remove(`${button.id}-active`);
            document.querySelector(`.task-form-${button.id.split('-')[0]}-icon`).classList.remove('f-white');
        }
    }

    selectedButton.classList.toggle(`${buttonID}-active`);
    document.querySelector(`.task-form-${buttonID.split('-')[0]}-icon`).classList.toggle('f-white');
}


/**
 * the min date attribute for the date input is set after body onload
 */
function setMinDate() {
    const dateField = document.getElementById('date');
    const date = new Date();
    const dateFormated = date.toISOString().split('T')[0];
    dateField.min = dateFormated;
}


/**
 * add the value of input field as a subtask beneath input field
 */
function addSubtask() {
    const subtasksContainer = document.getElementById('subtasks-container');
    const subtaskField = document.getElementById('subtasks');

    if (subtaskField.value) {
        subtasksContainer.innerHTML += subtaskHTML(subtaskField.value, subtaskIndex);
        subtaskIndex++;
        subtaskField.value = '';
    }
}


/**
 * edit the text content of the added subtask and render new icons
 * @param {number} index - index of the clicked subtask is passed
 */
function editSubtask(index) {
    const subtaskSpan = document.getElementById(`subtask-input${index}`);

    if (!subtaskSpan.isContentEditable) {
        subtaskSpan.contentEditable = true;
        subtaskSpan.focus();
        document.getElementById(`subtask-icons${index}`).innerHTML = subtaskEditHTML(index);
    }
}


/**
 * save the change of the content of the subtask and render the default icons
 * @param {number} index - index of the clicked subtask is passed
 */
function stopEditingSubtask(index) {
    const subtaskSpan = document.getElementById(`subtask-input${index}`);
    
    if (subtaskSpan.isContentEditable) {
        subtaskSpan.contentEditable = false;
        document.getElementById(`subtask-icons${index}`).innerHTML = subtaskEditDefaultHTML(index);
    }
}


/**
 * remove the created subtask
 * @param {number} index - index of the clicked subtask is passed
 */
function deleteSubtask(index) {
    const subtaskItem = document.getElementById(`subtask-item${index}`);
    subtaskItem.remove();
}


/**
 * check if any button is selected if so return the button id otherwise return null
 * @returns - either the selected button id or null
 */
function getPrioButton() {
    const urgentButton = document.getElementById('urgent-btn');
    const mediumButton = document.getElementById('medium-btn');
    const lowButton = document.getElementById('low-btn');
    const buttons = [lowButton, mediumButton, urgentButton];

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const buttonClassName = button.className; 
        if (buttonClassName.includes('active')) {
            return button.id;
        }
    }
    return null;
}


/**
 * returns either an array with all the selected users of assigned field or null
 * @returns - either an array or null
 */
function getSelectedUsers() {
    if (assignedUsers.length) {
        return assignedUsers;
    } else if (!assignedUsers.length) {
        return null;
    }
}


/**
 * returns array containing objects with the subtasks if any subtasks exists otherwise null
 * @returns - either an array or null
 */
function getSubtasks() {
    const subtaskInputList = document.querySelectorAll('.subtask-input');
    const subtasks = [];

    for (let i = 0; i < subtaskInputList.length; i++) {
        let newSubtask = {
            taskDescription: subtaskInputList[i].innerText,
            isDone: false,
          };
          subtasks.push(newSubtask);
    }
    if (subtaskInputList.length) {
        return subtasks;
    } else if (!subtaskInputList.length) {
        return null;
    }
}


/**
 * returns the priority description of selected button deleting '-btn'
 * @returns - string with name of selected button
 */
function modifyPrioString () {
    let prio = getPrioButton();
    let modifiedPrio = prio.slice(0, -4);
    modifiedPrio = modifiedPrio.charAt(0).toUpperCase() + modifiedPrio.slice(1);
    return modifiedPrio;
}


/**
 * render the add new contact card with slide in animation
 */
function showAddNewContact() {
    const newContactContainer = document.getElementById('new-contact-container');

    newContactContainer.innerHTML = addNewContactHTML();
    document.body.style = 'overflow: hidden';
    setTimeout(() => {
        const newContactCard = document.getElementById('overlay-container');
        newContactCard.classList.add('transform-0');
    }, 0);
}


/**
 * remove the add new contact card with slide out animation
 */
function closeAddNewContact() {
    const addContactDiv = document.getElementById('overlay-background');
    const newContactContainer = document.getElementById('overlay-container');
    newContactContainer.classList.remove('transform-0');

    setTimeout(() => {
        addContactDiv.remove();
        document.body.style = 'overflow: unset';
    }, 250);
}


/**
 * save the new user, close the dropdown and the add new contact card
 */
async function addNewContactTask() {
    await setNewUser();
    handleAssignDropdown();
    closeAddNewContact();
}


/**
 * saving the values of the new contact inputs in the users array and sending POST request
 */
async function setNewUser() {
    let contactName = document.getElementById('new-name').value;
    let contactEmail = document.getElementById('new-email').value;
    let contactPhone = document.getElementById('new-phone').value;

    let formattedName = formatName(contactName);

    let newUser = {
        firstName: formattedName.firstName,
        lastName: formattedName.lastName,
        initials: formattedName.initials,
        email: contactEmail,
        phone: contactPhone,
        isYou: false,
        password: null,
        userID: users.length,
        userColor: setUserColor()
    }

    users.push(newUser)
    await setItem('users', JSON.stringify(users));
}


/**
 * handling the assign dropdown menu after new user has been created
 */
function handleAssignDropdown() {
    removeAssignDropdown();
    closeAssignDropdown();
}


/**
 * removing the html elements inside the dropdown menu for toggleAssignDropdown()
 */
function removeAssignDropdown() {
    const assignUsers = document.getElementById('assign-contacts');
    const assignNewContactBtn = document.getElementById('assign-button-container');

    assignUsers.remove();
    assignNewContactBtn.innerHTML = '';
}