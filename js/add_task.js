let allTasks = [];
let subtaskIndex = 0;
let selectedUsers = []; 
let assignInput, assignDropdown;
let users = [
    { 
        firstName: 'Sofia',
        lastName: 'Müller',
        initials: 'SM',
        userColor: '#1FD7C1',
        isYou: true
    },
    {
        firstName: "Marcel",
        lastName: "Bauer",
        initials: 'MB',
        userColor: "#462F8A",
        isYou: false
    },
    {
        firstName: "Anton",
        lastName: "Mayer",
        initials: 'AM',
        userColor: "#0038FF",
        isYou: false
      },
    { 
        firstName: 'Anja',
        lastName: 'Schulz',
        initials: 'AS',
        userColor: '#ffa500',
        isYou: false
    },
    { 
        firstName: 'Benedikt',
        lastName: 'Ziegler',
        initials: 'BZ',
        userColor: '#ee82ee',
        isYou: false
    },
    { 
        firstName: 'David',
        lastName: 'Eisenberg',
        initials: 'DE',
        userColor: '#ffa07a',
        isYou: false
    },
    { 
        firstName: 'Eva',
        lastName: 'Fischer',
        initials: 'EF',
        userColor: '#c16dee',
        isYou: false
    }
];


async function init() {
    await includeHTML();
    setMinDate();
}


function addTask() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const date = document.getElementById('date');
    const category = document.getElementById('category');
    let task = {
        "title": title.value,
        "description": description.value,
        "assignedTo": getSelectedUsers(),
        "date": date.value,
        "prio": getPrioButton(),
        "category": category.value,
        "subtasks": getSubtasks()
    };

    allTasks.push(task);
    resetForm();
}


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


function resetSubtasks() {
    const subtasksItems = document.querySelectorAll('.subtask-item');
    for (const subtaskItem of subtasksItems) {
        subtaskItem.remove();
    }
}


function resetCategory() {
    const categoryInputField = document.getElementById('category');
    categoryInputField.value = 'Select task category';
    closeCategoryDropdown();
}


function toggleAssignDropdown() {
    assignInput = document.getElementById('assign');
    assignDropdown = document.getElementById('assign-content');
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


function closeAssignDropdown() {
    const arrow = 'assign';
    assignInput.blur();

    assignDropdown.classList.add('d-none');
    defaultArrow(arrow);
    resetInputValue();
    renderInitials();
}


function resetInputValue() {
    assignInput.placeholder = 'Select contacts to assign';
}


function renderInitials() {
    let initialsContent = document.getElementById('initials-content');
    let initialsContainer = '<div class="initials-container">';
    if (selectedUsers.length > 0) {
        for (let i = 0; i < selectedUsers.length; i++) {
            const selectedUser = selectedUsers[i];
            initialsContainer += renderInitialsHTML(selectedUser);
        }
        initialsContainer += '</div>';
        initialsContent.innerHTML += initialsContainer;
    } 
}


function renderInitialsHTML(selectedUser) {
    const selectedUserArrName = selectedUser.split(' ');
    for (const user of users) {
        if (user.firstName === selectedUserArrName[0]) {
            return `
                <span class="selected-initials" style="background: ${user.userColor}">${selectedUserArrName[0].charAt(0)}${selectedUserArrName[1].charAt(0)}</span>
            `;
        }
    }
}


function removeInitials() {
    const initialsContainer = document.querySelector('.initials-container');
    if (initialsContainer) {
        initialsContainer.remove();
    }
}


function initSearchUser() {
    assignInput.addEventListener('input', searchUser);
}


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


function rotateArrow(arrow) {
    const arrowAssign = document.getElementById('arrow-assign');
    const arrowCategory = document.getElementById('arrow-category');

    if (arrow === 'assign') {
        arrowAssign.style.transform = 'rotate(180deg)';
    } else if (arrow === 'category') {
        arrowCategory.style.transform = 'rotate(180deg)';
    }
}


function defaultArrow(arrow) {
    const arrowAssign = document.getElementById('arrow-assign');
    const arrowCategory = document.getElementById('arrow-category');

    if (arrow === 'assign') {
        arrowAssign.style.transform = 'rotate(0)';
    } else if (arrow === 'category') {
        arrowCategory.style.transform = 'rotate(0)';
    }
}


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


function pushUser(i) {
    const userName = document.querySelector(`.assign-contact-name${i}`).innerText;
    if (!selectedUsers.includes(userName)) {
        selectedUsers.push(userName);
    }
}


function removeUser(i) {
    const userName = document.querySelector(`.assign-contact-name${i}`).innerText;
    const indexOfUser = selectedUsers.indexOf(userName);
    if (selectedUsers.includes(userName)) {
        selectedUsers.splice(indexOfUser, 1);
    }
}


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


function closeCategoryDropdown() {
    const categoryInputField = document.getElementById('category');
    const categoryContainer = document.getElementById('category-content');
    const arrow = 'category';
    categoryContainer.innerHTML = '';
    categoryInputField.blur();
    defaultArrow(arrow);
}


function selectCategoryItem(i) {
    const selectedItem = document.getElementById(`category-item${i}`).innerText;
    const categoryField = document.getElementById('category');

    categoryField.value = selectedItem;
    closeCategoryDropdown();
}


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


function setMinDate() {
    const dateField = document.getElementById('date');
    const date = new Date();
    const dateFormated = date.toISOString().split('T')[0];
    dateField.min = dateFormated;
}


function addSubtask() {
    const subtasksContainer = document.getElementById('subtasks-container');
    const subtaskField = document.getElementById('subtasks');

    if (subtaskField.value) {
        subtasksContainer.innerHTML += subtaskHTML(subtaskField.value, subtaskIndex);
        subtaskIndex++;
        subtaskField.value = '';
    }
}


function editSubtask(index) {
    const subtaskSpan = document.getElementById(`subtask-input${index}`);

    if (!subtaskSpan.isContentEditable) {
        subtaskSpan.contentEditable = true;
        subtaskSpan.focus();
        document.getElementById(`subtask-icons${index}`).innerHTML = subtaskEditHTML(index);
    }
}


function stopEditingSubtask(index) {
    const subtaskSpan = document.getElementById(`subtask-input${index}`);
    
    if (subtaskSpan.isContentEditable) {
        subtaskSpan.contentEditable = false;
        document.getElementById(`subtask-icons${index}`).innerHTML = subtaskEditDefaultHTML(index);
    }
}


function deleteSubtask(index) {
    const subtaskItem = document.getElementById(`subtask-item${index}`);
    subtaskItem.remove();
}


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


function getSelectedUsers() {
    if (selectedUsers.length) {
        return selectedUsers;
    } else if (!selectedUsers.length) {
        return null;
    }
}


function getSubtasks() {
    const subtaskInputList = document.querySelectorAll('.subtask-input');
    const subtasks = [];

    for (let i = 0; i < subtaskInputList.length; i++) {
        const subtaskInput = subtaskInputList[i];
        subtasks.push(subtaskInput.innerText);
    }
    if (subtaskInputList.length) {
        return subtasks;
    } else if (!subtaskInputList.length) {
        return null;
    }
}


function assignDropdownHTML(i) {
    const userFirstName = users[i]['firstName'];
    const userLastName = users[i]['lastName'];
    const userInitials = users[i]['initials'];
    const userColor = users[i]['userColor'];
    return /*html*/ `
        <div class="assign-contact" id="assign-contact${i}" onclick="selectContact(${i})">
            <div class="assign-contact-info">
                <div class="assign-initials" style="background-color: ${userColor}">${userInitials}</div>
                <span class="assign-contact-name${i}">${userFirstName} ${userLastName}<span>
            </div>
            <div id="assign-icon-container${i}">
                <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
            </div>
        </div>
    `;
}


function assignDropdownBtnHTML() {
    return /*html*/`
        <button class="main-button main-button--assign" type="button">Add new Contact
            <svg class="assign-person-icon"><use href="assets/img/icons.svg#person-icon"></use></svg>
        </button>
    `;
}


function categoryDropdownHTML() {
    return /*html*/`
        <div class="category-overlay" id="assign-overlay" onclick="closeCategoryDropdown()"></div>
        <div class="category-dropdown-menu">
            <div class="category-item" id="category-item0" onclick="selectCategoryItem(0)">Technical Task</div>
            <div class="category-item" id="category-item1" onclick="selectCategoryItem(1)">User Story</div>
        </div>
    `;
}


function subtaskHTML(subtaskField, index) {
    return /*html*/`
        <div class="subtask-item" id="subtask-item${index}">
            <div class="subtask-info">
                <span>&#x2022</span>
                <span class="subtask-input" id="subtask-input${index}">${subtaskField}</span>
            </div>
            <div class="subtask-icon-container" id="subtask-icons${index}">
                <div onclick="editSubtask(${index})">
                    <svg class="subtask-edit-icon"><use href="assets/img/icons.svg#edit-icon"></use></svg>
                </div>
                <span class="subtask-separator"></span>
                <div onclick="deleteSubtask(${index})">
                    <svg class="subtask-delete-icon"><use href="assets/img/icons.svg#delete-icon"></use></svg>
                </div>
            </div>
        </div>
    `;
}


function subtaskEditHTML(index) {
    return /*html*/`
        <div onclick="deleteSubtask(${index})">
            <svg class="subtask-delete-icon"><use href="assets/img/icons.svg#delete-icon"></use></svg>
        </div>
        <span class="subtask-separator"></span>
        <div onclick="stopEditingSubtask(${index})">
            <svg class="subtask-accept-icon"><use href="assets/img/icons.svg#check-icon-blue"></use></svg>
        </div>
    `;
}


function subtaskEditDefaultHTML(index) {
    return /*html*/`
       <div onclick="editSubtask(${index})">
            <svg class="subtask-edit-icon"><use href="assets/img/icons.svg#edit-icon"></use></svg>
        </div>
        <span class="subtask-separator"></span>
        <div onclick="deleteSubtask(${index})">
            <svg class="subtask-delete-icon"><use href="assets/img/icons.svg#delete-icon"></use></svg>
        </div>
    `;
}