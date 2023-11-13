let allTasks = [];


let subtaskIndex = 0;


function init() {
    setMinDate();
}


function addTask() {
    let task = {
        "title": title.value,
        "description": description.value,
        "assignedTo": 'contact',
        "date": date.value,
        "prio": 'urgent',
        "category": 'category',
        "subtasks": 'subtasks'
    }

    allTasks.push(task);
    console.log(allTasks);
    resetForm(title, description, date);
}


function resetForm(title, description, date) {
    title.value = '';
    description.value = '';
    date.value = '';
}


function toggleAssignDropdown() {
    let assignField = document.getElementById('assign');
    let assignDropdown = document.getElementById('assign-content');
    let arrow = 'assign';

    if(document.querySelector('.assign-dropdown-menu')) {
        closeAssignDropdown();
    } else {
        assignField.value = '';
        rotateArrow(arrow);
        assignDropdown.innerHTML = assignDropdownHTML();
    }
}


function rotateArrow(arrow) {
    let arrowAssign = document.getElementById('arrow-assign');
    let arrowCategory = document.getElementById('arrow-category');

    if (arrow === 'assign') {
        arrowAssign.style.transform = 'rotate(180deg)';
    } else if (arrow === 'category') {
        arrowCategory.style.transform = 'rotate(180deg)';
    }
}


function closeAssignDropdown() {
    let assignDropdown = document.getElementById('assign-content');
    let arrow = 'assign';
    assignDropdown.innerHTML = '';
    defaultArrow(arrow);
    resetInputValue();
}


function defaultArrow(arrow) {
    let arrowAssign = document.getElementById('arrow-assign');
    let arrowCategory = document.getElementById('arrow-category');

    if (arrow === 'assign') {
        arrowAssign.style.transform = 'rotate(0)';
    } else if (arrow === 'category') {
        arrowCategory.style.transform = 'rotate(0)';
    }
}


function resetInputValue() {
    let assignInputField = document.getElementById('assign');
    assignInputField.value = 'Select contacts to assign';
}


function selectContact(i) {
    let contact = document.getElementById(`assign-contact${i}`);
    let iconContainer = document.getElementById(`assign-icon-container${i}`);

    if (contact.classList.contains('bg-darkblue')) {
        contact.classList.remove('bg-darkblue');
        iconContainer.innerHTML = `
            <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
        `;
    } else {
        contact.classList.add('bg-darkblue');
        iconContainer.innerHTML = `
            <svg class="assign-checked-icon"><use href="assets/img/icons.svg#checked-icon"></use></svg>
        `;
    }
}


function toggleCategoryDropdown() {
    let categoryContainer = document.getElementById('category-content');
    let arrow = 'category';

    if (document.querySelector('.category-dropdown-menu')) {
        closeCategoryDropdown();
    } else {
        categoryContainer.innerHTML = categoryDropdownHTML();
        rotateArrow(arrow);
    }
}


function closeCategoryDropdown() {
    let categoryContainer = document.getElementById('category-content');
    let arrow = 'category';
    categoryContainer.innerHTML = '';
    defaultArrow(arrow);
}


function selectCategoryItem(i) {
    let selectedItem = document.getElementById(`category-item${i}`).innerText;
    let categoryField = document.getElementById('category');

    categoryField.innerText = selectedItem;
    closeCategoryDropdown();
}


function selectPrioButton(buttonID) {
    let selectedButton = document.getElementById(buttonID);
    let buttonLow = document.getElementById('low-btn');
    let buttonMedium = document.getElementById('medium-btn');
    let buttonUrgent = document.getElementById('urgent-btn');
    let buttons = [buttonLow, buttonMedium, buttonUrgent];

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button !== selectedButton) {
            button.classList.remove(`${button.id}-active`);
            document.querySelector(`.task-form-${button.id.split('-')[0]}-icon`).classList.remove('f-white');
        }
    };

    selectedButton.classList.toggle(`${buttonID}-active`);
    document.querySelector(`.task-form-${buttonID.split('-')[0]}-icon`).classList.toggle('f-white');
}


function setMinDate() {
    let dateField = document.getElementById('date');
    let date = new Date();
    let dateFormated = date.toISOString().split('T')[0];
    dateField.min = dateFormated;
}


function addSubtask() {
    let subtasksContainer = document.getElementById('subtasks-container');
    let subtaskField = document.getElementById('subtasks').value;

    if (subtaskField) {
        subtasksContainer.innerHTML += subtaskHTML(subtaskField, subtaskIndex);
        subtaskIndex++;
    }
}


function editSubtask(index) {
    let subtaskSpan = document.getElementById(`subtask-input${index}`);
    let inputElement = document.createElement('input');

    if (document.getElementById(`subtask-text${index}`)) {
        document.getElementById(`subtask-text${index}`).focus();
    } else {
        inputElement.value = subtaskSpan.innerText;
        inputElement.name = 'subtask';
        inputElement.type = 'text';
        inputElement.className = 'subtask-text';
        inputElement.id = `subtask-text${index}`;
        subtaskSpan.parentNode.replaceChild(inputElement, subtaskSpan);
        inputElement.focus();
    }
}


function deleteSubtask(index) {
    let subtaskItem = document.getElementById(`subtask-item${index}`);
    subtaskItem.remove();
}


function assignDropdownHTML() {
    return /*html*/ `
        <div class="assign-overlay" id="assign-overlay" onclick="closeAssignDropdown()"></div>
        <div class="assign-dropdown-menu">
            <div class="assign-contact" id="assign-contact0" onclick="selectContact(0)">
                <div class="assign-contact-info">
                    <div class="assign-initials bg-lightblue">SM</div>
                    <span class="assign-contact-name">Sofia Müller (You)<span>
                </div>
                <div id="assign-icon-container0">
                    <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
                </div>
            </div>
            <div class="assign-contact" id="assign-contact1" onclick="selectContact(1)">
                <div class="assign-contact-info">
                    <div class="assign-initials bg-orange">AM</div>
                    <span class="assign-contact-name">Anton Meyer<span>
                </div>
                <div id="assign-icon-container1">
                    <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
                </div>
            </div>
            <div class="assign-contact" id="assign-contact2" onclick="selectContact(2)">
                <div class="assign-contact-info">
                    <div class="assign-initials bg-violet">AS</div>
                    <span class="assign-contact-name">Anja Schulz<span>
                </div>
                <div id="assign-icon-container2">
                    <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
                </div>
            </div>
            <div class="assign-contact" id="assign-contact3" onclick="selectContact(3)">
                <div class="assign-contact-info">
                    <div class="assign-initials bg-pink">BZ</div>
                    <span class="assign-contact-name">Benedikt Ziegler<span>
                </div>
                <div id="assign-icon-container3">
                    <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
                </div>
            </div>
            <div class="assign-contact" id="assign-contact4" onclick="selectContact(4)">
                <div class="assign-contact-info">
                    <div class="assign-initials bg-yellow">DE</div>
                    <span class="assign-contact-name">David Eisenberg<span>
                </div>
                <div id="assign-icon-container4">
                    <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
                </div>
            </div>
            <div class="assign-contact" id="assign-contact5" onclick="selectContact(5)">
                <div class="assign-contact-info">
                    <div class="assign-initials bg-salmon">EF</div>
                    <span class="assign-contact-name">Eva Fischer<span>
                </div>
                <div id="assign-icon-container5">
                    <svg class="assign-square-icon"><use href="assets/img/icons.svg#square-icon"></use></svg>
                </div>
            </div>
        </div>
        <div class="assign-button-container">
            <button class="main-button main-button--assign" type="button">Add new Contact
                <svg class="assign-person-icon"><use href="assets/img/icons.svg#person-icon"></use></svg>
            </button>
        </div>
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
                <span id="subtask-input${index}">${subtaskField}</span>
            </div>
            <div class="subtask-icon-container">
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