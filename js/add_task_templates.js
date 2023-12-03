/**
 * returns the html for the content of the assign dropdownmenu
 * @param {number} i - stands for index of the current user
 * @returns - string with the html
 */
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


/**
 * returns the html for the button content inside the assign dropdownmenu
 * @returns - string with the html
 */
function assignDropdownBtnHTML() {
    return /*html*/`
        <button class="main-button main-button--assign" type="button" onclick="showAddNewContact()">Add new Contact
            <svg class="assign-person-icon"><use href="assets/img/icons.svg#person-icon"></use></svg>
        </button>
    `;
}


/**
 * returns the html for the content of the category dropdown menu
 * @returns - string with html
 */
function categoryDropdownHTML() {
    return /*html*/`
        <div class="category-overlay" id="assign-overlay" onclick="closeCategoryDropdown()"></div>
        <div class="category-dropdown-menu">
            <div class="category-item" id="category-item0" onclick="selectCategoryItem(0)">Technical Task</div>
            <div class="category-item" id="category-item1" onclick="selectCategoryItem(1)">User Story</div>
        </div>
    `;
}


/**
 * returns the html for the added subtasks
 * @param {string} subtaskField - stands for the value of the input
 * @param {number} index - stands for the index of the current subtask
 * @returns - string with html
 */
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


/**
 * returns the html of the new icons while editing a subtask
 * @param {number} index - index of the current subtask
 * @returns - string with html
 */
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


/**
 * returns the html of the default icons of a subtask
 * @param {number} index - index of current subtask
 * @returns - string with html
 */
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


/**
 * returns the html for the add new contact card
 * @returns - string with html
 */
function addNewContactHTML() {
    return /*html*/`
        <div class="add-contact-overlay" id="overlay-background" onclick="closeAddNewContact()">
            <div class="addContactContainer" id="overlay-container" onclick="event.stopPropagation()">
                <div class="addContactLeftPart">
                    <img class="addContactJoinLogo" src="./img/join-logo.svg">
                    <div class="overlayHeadline">Add contact</div>
                    <div class="textTasksAre">Tasks are better with a team!</div>
                    <div class="textTasksAre-border"></div>
                </div>
                <div class="addContactRightPart">
                    <img class="closeAddContact" src="./img/close-grey.svg" onclick="closeAddNewContact()">
                    <img class="closeAddContact-rs" src="./img/cancel-white.svg" onclick="closeAddNewContact()">
                    <div class="userInfo">
                        <img class="userWhiteIcon" src="./img/persona.svg">
                        <form id="addContactFrom" onsubmit="addNewContactTask(); return false;">
                            <div class="contactDetailsContainer">
                                <div class="contactsDetailsFrame">
                                    <input id="new-name" class="style-input styleUserIcon" required type="text"
                                        placeholder="Name">
                                </div>
                                <div class="contactsDetailsFrame">
                                    <input id="new-email" class="style-input styleUserLetter" required type="email"
                                        placeholder="Email">
                                    <div class="red-text" id="double-email"></div>
                                </div>
                                <div class="contactsDetailsFrame">
                                    <input id="new-phone" class="style-input input-icon-phone" placeholder="Phone"
                                        required type="text" oninput="validateInput(this)">
                                </div>
                            </div>

                            <div class="overlay-btn-frame">
                                <div class="overlay-cancel-btn" onclick="closeAddNewContact()">
                                    <div class="overlay-cancel-btn-text">Cancel</div>
                                    <div class="overlay-cancel-btn-image"></div>
                                </div>
                                <button type="submit" form="addContactFrom" class="overlay-create-btn">
                                    <div class="overlay-create-btn-text">Create contact</div>
                                    <img src="./img/check.svg">
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}