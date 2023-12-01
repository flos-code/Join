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
 * empty selectedUsers array and remove highlighting of selected user in dropdown menu
 */
function resetSelectedUsers() {
    selectedUsers = [];
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
 * initialize dropdown menu of assign field after users are fetched
 */
function initAssignOnclick() {
    assignInput = document.getElementById('assign');
    assignDropdown = document.getElementById('assign-content');
    const assignArrow = document.getElementById('arrow-assign');

    assignInput.addEventListener('click', toggleAssignDropdown);
    assignArrow.addEventListener('click', toggleAssignDropdown);
}


/**
 * toggle between open and closed dropdown menu of assign field
 */
function toggleAssignDropdown() {
    const assignContactItem = document.querySelector('.assign-contact');
    const arrow = 'assign';

    if (!assignDropdown.classList.contains('d-none')) {
        closeAssignDropdown();
    } else if (assignDropdown.classList.contains('d-none') && !assignContactItem) {
        openAssignDropdown();
    } else if (assignContactItem) {
        assignInput.placeholder = '';
        rotateArrow(arrow);
        assignDropdown.classList.remove('d-none');
        removeInitials();
    }
}


/**
 * render dropdown menu for assign field 
 */
function openAssignDropdown() {
    const assignDropdownMenu = document.getElementById('assign-dropdown-menu');
    const assignBtnContainer = document.getElementById('assign-button-container');
    const arrow = 'assign';
    let container = '<div id="assign-contacts">';

    assignInput.placeholder = '';
    rotateArrow(arrow);
    assignDropdown.classList.remove('d-none');
    if (!assignInput.value) {
        for (let i = 0; i < users.length; i++) {
            container += assignDropdownHTML(i);
        }
        container += '</div>';
        assignDropdownMenu.innerHTML = container;
        assignBtnContainer.innerHTML += assignDropdownBtnHTML();
    }
    initSearchUser();
    removeInitials();
}


/**
 * hide dropdown menu for assign field, reset input value and render the initials of selected users
 */
function closeAssignDropdown() {
    const arrow = 'assign';
    assignInput.blur();

    assignDropdown.classList.add('d-none');
    defaultArrow(arrow);
    resetInputValue();
    renderInitials();
}


/**
 * set input value of assign field to default
 */
function resetInputValue() {
    assignInput.placeholder = 'Select contacts to assign';
}


/**
 * render the initials of the selected users beneath the assign field
 */
function renderInitials() {
    let initialsContent = document.getElementById('initials-content');
    let initialsContainer = '<div class="initials-container" id="initials-container">';
    if (assignedUsers.length > 0) {
        for (let i = 0; i < assignedUsers.length; i++) {
            const assignedUser = assignedUsers[i];
            initialsContainer += renderInitialsHTML(assignedUser);
        }
        initialsContainer += '</div>';
        initialsContent.innerHTML += initialsContainer;
    } 
}


/**
 * checks for equality of first and last name and returns the html for the rendering of the selected user
 * 
 * @param {string} assignedUser - stands for object of the user
 * @returns returns the html with the right information of the user object
 */
function renderInitialsHTML(assignedUser) {
    for (const user of users) {
        if (user.firstName === assignedUser.firstName && user.lastName === assignedUser.lastName) {
            return `
                <span class="selected-initials" style="background: ${user.userColor}">${assignedUser.initials}</span>
            `;
        }
    }
}


/**
 * remove existing initials
 */
function removeInitials() {
    const initialsContainer = document.querySelector('.initials-container');
    if (initialsContainer) {
        initialsContainer.remove();
    }
}


/**
 * initialize the search function only after assign dropdown menu is rendered
 */
function initSearchUser() {
    assignInput.addEventListener('input', searchUser);
}


/**
 * search functionality for certain users to render according to input
 */
function searchUser() {
    const inputValue = assignInput.value.toLowerCase();
    const assignContacts = document.getElementById('assign-contacts');
    assignContacts.innerHTML = '';
    
    if (assignContacts.childElementCount === 0) {
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userName = user['firstName'].toLowerCase() + ' ' + user['lastName'].toLowerCase();
            if (userName.includes(inputValue.trim())) {
                assignContacts.innerHTML += assignDropdownHTML(i);
                handleSelectedUsers(i);
            }
        }
    }
}


/**
 * checking if the searched user was before selected to render the selection
 * @param {number} i - index to get the correct user in the users array
 */
function handleSelectedUsers(i) {
    const userNameRendered = document.querySelector(`.assign-contact-name${i}`);
    const iconContainer = document.getElementById(`assign-icon-container${i}`);
    const userContainer = document.getElementById(`assign-contact${i}`);

    if (selectedUsers.includes(userNameRendered.innerText)) {
        userContainer.classList.add('assign-contact-selected');
        iconContainer.innerHTML = `
            <svg class="assign-checked-icon"><use href="assets/img/icons.svg#checked-icon"></use></svg>
        `;
    }
}


/**
 * rotate arrow icon when dropdown menu is opened
 * @param {string} arrow - stands for either assign or category
 */
function rotateArrow(arrow) {
    const arrowAssign = document.getElementById('arrow-assign');
    const arrowCategory = document.getElementById('arrow-category');

    if (arrow === 'assign') {
        arrowAssign.style.transform = 'rotate(180deg)';
    } else if (arrow === 'category') {
        arrowCategory.style.transform = 'rotate(180deg)';
    }
}


/**
 * set arrow icon to default when dropdown menu is closed
 * @param {string} arrow - stands for either assign or category
 */
function defaultArrow(arrow) {
    const arrowAssign = document.getElementById('arrow-assign');
    const arrowCategory = document.getElementById('arrow-category');

    if (arrow === 'assign') {
        arrowAssign.style.transform = 'rotate(0)';
    } else if (arrow === 'category') {
        arrowCategory.style.transform = 'rotate(0)';
    }
}


/**
 * select user on click if not selected before, otherwise remove selection
 * @param {number} i - index of the clicked element
 */
function selectContact(i) {
    const contact = document.getElementById(`assign-contact${i}`);
    const iconContainer = document.getElementById(`assign-icon-container${i}`);

    if (contact.classList.contains('assign-contact-selected')) {
        contact.classList.remove('assign-contact-selected');
        iconContainer.innerHTML = `
            <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
        `;
        removeUser(i);
    } else {
        contact.classList.add('assign-contact-selected');
        iconContainer.innerHTML = `
            <svg class="assign-checked-icon"><use href="assets/img/icons.svg#checked-icon"></use></svg>
        `;
        pushUser(i);
    }
}


/**
 * save name and the object of selected user in global variables
 * @param {number} i - index of the clicked element
 */
function pushUser(i) {
    const userName = document.querySelector(`.assign-contact-name${i}`).innerText;
    const userObj = users[i];
    if (!selectedUsers.includes(userName)) {
        selectedUsers.push(userName);
    }
    if (!assignedUsers.includes(userObj)) {
        assignedUsers.push(userObj);
    }
}


/**
 * remove the name and the object from global variables of the now unselected user
 * @param {number} i - index of the clicked element
 */
function removeUser(i) {
    const userName = document.querySelector(`.assign-contact-name${i}`).innerText;
    const indexOfUserName = selectedUsers.indexOf(userName);
    const userObj = users[i];
    const indexOfUserObj = assignedUsers.indexOf(userObj);
    if (selectedUsers.includes(userName)) {
        selectedUsers.splice(indexOfUserName, 1);
    }
    if (assignedUsers.includes(userObj)) {
        assignedUsers.splice(indexOfUserObj, 1);
    }
}


/**
 * toggle between open and closed category dropdown menu 
 */
function toggleCategoryDropdown() {
    const categoryContainer = document.getElementById('category-content');
    const arrow = 'category';

    if (document.querySelector('.category-dropdown-menu')) {
        closeCategoryDropdown();
    } else {
        categoryContainer.innerHTML = categoryDropdownHTML();
        rotateArrow(arrow);
    }
}


/**
 * close category dropdown menu by emptying its content
 */
function closeCategoryDropdown() {
    const categoryInputField = document.getElementById('category');
    const categoryContainer = document.getElementById('category-content');
    const arrow = 'category';
    categoryContainer.innerHTML = '';
    categoryInputField.blur();
    defaultArrow(arrow);
}


/**
 * setting the input value to the selected dropdown item and closing the menu
 * @param {index} i - index of the selected category item
 */
function selectCategoryItem(i) {
    const selectedItem = document.getElementById(`category-item${i}`).innerText;
    const categoryField = document.getElementById('category');

    categoryField.value = selectedItem;
    closeCategoryDropdown();
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