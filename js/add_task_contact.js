

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
async function closeAddNewContact() {
    const addContactDiv = document.getElementById('overlay-background');
    const newContactContainer = document.getElementById('overlay-container');
    newContactContainer.classList.remove('transform-0');

    await new Promise(resolve => setTimeout(() => {
        addContactDiv.remove();
        document.body.style = 'overflow: unset';
        resolve();
    }, 250));
}


/**
 * save the new user, close the dropdown and the add new contact card
 */
async function addNewContactTask() {
    await setNewUser();
    handleAssignDropdown();
    await closeAddNewContact();
    await successContactTask();
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
 * show success message after creation of new contact with promise for settimeout
 */
async function successContactTask() {
    const successContainer = document.getElementById('success-contact');
    const successMessage = document.getElementById('success-contact-animation');

    successContainer.classList.add('visible');
    successMessage.classList.add('translate-100');
    
    await new Promise(resolve => setTimeout(() => {
        successMessage.classList.remove('translate-100');
        successContainer.classList.remove('visible');
        resolve();
    }, 1500));
}


/**
 * handling the assign dropdown menu after new user has been created
 */
function handleAssignDropdown() {
    selectedUsers = [];
    assignedUsers = [];
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