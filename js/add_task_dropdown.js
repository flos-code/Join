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