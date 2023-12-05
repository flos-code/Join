/**
 * Setting all required varibles and arrays
 */
let contactInitials;

let newEmail = 0;

users = [];
let contacts = [];

/**
 * This function initializes and loads user contacts asynchronously and renders them in alphabetical order
 */
async function InitContacts() {
    await init();
    await loadUsers();
    contactsAlphabetical(users);
    renderAlphabet();
}

/**
 * This function loads all users
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading Users error: ', e);
    }
}


/**
* close the edit overlay mask
*/
function closeEditOverlay() {
    document.getElementById("overlay-container").classList.remove("transform-0")

    setTimeout(() => {
        document.getElementById("edit-background").remove();
    }, 250);
}

/**
* Show active site on the navigation bar -> Contacts
*/
function addActiveClass3() {
    document.getElementById('id-3').classList.add('active');
    document.getElementById('idResponsive-3').classList.add('active');
}

/**
 This function remove non-nueric characters, max numbers is 16 
 */
function validateInput(input) {
    input.value = input.value.replace(/\D/g, '');
    if (input.value.length > 16) {
        input.value = input.value.slice(0, 16);
    }
}

/**
 This function sorts the users alphabetically.First, compare by firstName and 
 If firstName is the same, then compare by lastName
 */
function contactsAlphabetical(users) {
    contacts = users.slice().sort((a, b) => {
        let firstNameComparison = a.firstName.localeCompare(b.firstName);

        return firstNameComparison !== 0 ? firstNameComparison : a.lastName.localeCompare(b.lastName);
    });

    return contacts;
}

/**
 * Create an object to store div elements for each starting letter
 * Check if a div for the letter already exists
 * If it doesn't exist, create a new div
 * Store the reference to the div in the object
 */
function renderAlphabet() {
    let contactbook = document.getElementById('contact-book');
    contactbook.innerHTML = '';
    let letterDivs = {};

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstLetter = contact.firstName.charAt(0).toUpperCase();
        if (!letterDivs[firstLetter]) {
            let letterDiv = document.createElement('div');
            letterDiv.classList.add("letterDiv");
            letterDiv.id = `letter-${firstLetter}`;
            letterDiv.innerHTML = `<h2>${firstLetter}</h2>
            <div class="letterDivBorder"></div>`;
            contactbook.appendChild(letterDiv);
            letterDivs[firstLetter] = letterDiv;
        }
        renderContactDiv(i, contact, firstLetter, letterDivs);
    }
}

/**
 * create ahtml for the selected contact in the matching letterdiv
 * 
 * @param {number} i - number of current Contact
 * @param {object} contact - current contact 
 * @param {string} firstLetter - fist letter from the contacts first name
 * @param {html} letterDivs - div to display the contacts with the macthing first letter in
 */
function renderContactDiv(i, contact, firstLetter, letterDivs) {
    let contactDiv = document.createElement('div');
    contactDiv.id = `contact-${i}`;
    contactDiv.classList.add("contactDiv");
    contactDiv.onclick = function () { openContact(i) };
    contactDiv.innerHTML = /*html*/`
    <div class="contactInitials" style="background-color: ${contact.userColor};">
        ${contact.initials}
    </div>
    <div class="contactText">
    <span id="contactName-${i}" class="contactName">${contact.firstName} ${contact.lastName}</span>
    <span class="contactMail">${contact.email}</span>
    </div>
    `;

    letterDivs[firstLetter].appendChild(contactDiv);
}

/**
 * open the contact details
 */
function openContact(i) {
    let contactInfoDiv = document.getElementById("contactInfoContainer");
    openContatcMobile();
    contactInfoDiv.innerHTML = "";
    for (let j = 0; j < contacts.length; j++) {
        let contactDiv = document.getElementById(`contact-${j}`);
        let contactName = document.getElementById(`contactName-${j}`);
        contactDiv.style = "background-color: ;"
        contactName.style = "color: ;"

    }
    let contactDiv = document.getElementById(`contact-${i}`);
    let contactName = document.getElementById(`contactName-${i}`);
    contactDiv.style = "background-color: #2A3647;"
    contactName.style = "color: white;"
    contactInfoDiv.innerHTML += genertaeContactInfo(i);
}

/**
 * hides html elemtns for the mobile view of the contact page
 */
function openContatcMobile() {
    document.getElementById("contactOverview").classList.add("d-noneMobile");
    document.getElementById("contactInfoContainer").classList.add("d-flex");
    document.getElementById("contactHeadlineContent").classList.add("d-flex");
    document.getElementById("backArrow").classList.add("d-flex");
}



/**
 * open the contact overlay as edit mode with the current contact details
 */
function editContact(i) {
    document.getElementById("edit").innerHTML = generateEditOverlay(i);
    setTimeout(() => {
        document.getElementById("overlay-container").classList.add("transform-0")
    }, 0);

    loadeUserInfo(i);
}

/**
 * This function loads User's names, email and phone
 */
function loadeUserInfo(i) {
    let name = contacts[i]["firstName"] + " " + contacts[i]["lastName"];
    document.getElementById("edit-name").value = name;
    document.getElementById("edit-email").value = contacts[i]["email"];
    document.getElementById("edit-phone").value = contacts[i]["phone"];
}

/**
 * save the updated contact details
 */
async function saveContact(i) {
    let contact = contacts[i];
    let id = contact["userID"];
    let contactName = document.getElementById('edit-name').value;
    let contactEmail = document.getElementById('edit-email').value;
    let contactPhone = document.getElementById('edit-phone').value;
    let formattedName = formatName(contactName);

    contact["firstName"] = formattedName.firstName;
    contact["lastName"] = formattedName.lastName;
    contact["initials"] = formattedName.initials;
    contact["email"] = contactEmail;
    contact["phone"] = contactPhone;

    users[id]["firstName"] = formattedName.firstName;
    users[id]["lastName"] = formattedName.lastName;
    users[id]["initials"] = formattedName.initials;
    users[id]["email"] = contactEmail;
    users[id]["phone"] = contactPhone;
    await setItem('users', JSON.stringify(users));

    document.getElementById("edit").innerHTML = "";
    InitContacts();
    openContact(i);
    initHead();
}


/**
 * This function formats a given name by capitalizing the first letter 
 * of each word and splitting the words into first name, last name and initials.
 */
function formatName(name) {
    let words = name.split(' ');
    let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    let firstName = capitalizedWords[0];
    let lastName = capitalizedWords.slice(1).join(' ');
    let initials = words.map(word => word.charAt(0).toUpperCase()).join('');

    return {
        firstName: firstName,
        lastName: lastName,
        initials: initials
    };
}

/**
 * delete the actual contact in front- and backend
 */
async function deletContact(i) {
    let id = contacts[i]["userID"];
    users.splice(id, 1);
    contacts = [];
    for (let j = 0; j < users.length; j++) {
        users[j]["userID"] = j;
    }
    contactsAlphabetical(users)
    await setItem('users', JSON.stringify(users));
    document.getElementById("contactInfoContainer").innerHTML = "";
    closeMobileContactInfo();
    InitContacts();
    initHead();
}

/**
* show the overlay mask, where you can creat a new contact
*/
function showOverlay() {
    const newContactContainer = document.getElementById('newContactContainer');

    newContactContainer.innerHTML = addNewContactHTML();
    setTimeout(() => {
        const newContactCard = document.getElementById('overlay-container');
        newContactCard.classList.add('transform-0');
    }, 0);
}


/**
* close the overlay mask, where you can create a new contact
*/
async function closeOverlay() {
    const addContactDiv = document.getElementById('overlay-background');
    const newContactContainer = document.getElementById('overlay-container');
    newContactContainer.classList.remove('transform-0');

    await new Promise(resolve => setTimeout(() => {
        addContactDiv.remove();
        resolve();
    }, 250));
}

/**
* get the value from the diffrent inputfields and push all users
*/
async function addNewContact() {
    let newUser = {};
    let contactName = document.getElementById('new-name').value;
    let contactEmail = document.getElementById('new-email').value;
    let contactPhone = document.getElementById('new-phone').value;
    let formattedName = formatName(contactName);
    newUser = {
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
    await updateContactPage(newUser);
    openAndInitContact(newUser.userID);
    initHead();
}

/**
 * updates the cintact page and the user array with the new user
 * 
 * @param {object} newUser - object with all the infos about the new user
 */
async function updateContactPage(newUser) {
    users.push(newUser)
    await setItem('users', JSON.stringify(users));

    await closeOverlay();
    await successContact();
    await InitContacts();

}

/**
 * open the contact info page of the new created user
 * 
 * @param {number} userID - id from the new created user
 */
async function openAndInitContact(userID) {
    let position = findUserPosition(userID);
    openContact(position);
    await InitContacts();
}



/**
 * show success message after creation of new contact with promise for settimeout
 */
async function successContact() {
    const successContainer = document.getElementById('success-contact');
    const successMessage = document.getElementById('success-contact-animation');

    successContainer.classList.add('visible');
    successMessage.classList.add('translate-0');

    await new Promise(resolve => setTimeout(() => {
        successMessage.classList.remove('translate-0');
        successContainer.classList.remove('visible');
        resolve();
    }, 1500));
}

/**
 * set a User's Color
 */
function setUserColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * This function loops through the `contacts` array and looks for a user with the specified `id`. 
 * If the user is found, the user's index in the array is returned. Otherwise `undefined` will be returned.
 */
function findUserPosition(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].userID === id) {
            return i;
        }
    }

}

/**
 * closes the contact info in mobil view
 */
function closeMobileContactInfo() {
    document.getElementById("contactOverview").classList.remove("d-noneMobile");
    document.getElementById("contactInfoContainer").classList.remove("d-flex");
    document.getElementById("contactHeadlineContent").classList.remove("d-flex");
    document.getElementById("backArrow").classList.remove("d-flex");
}