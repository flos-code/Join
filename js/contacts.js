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
* get the updated contact details
*/
async function saveContact(i) {
    let contactName = document.getElementById('edit-name').value;
    let contactEmail = document.getElementById('edit-email').value;
    let contactPhone = document.getElementById('edit-phone').value;
    let contactInitials = contactName.match(/(\b\S)?/g).join("").toUpperCase();
    await updateContatcs(i, contactName, contactEmail, contactPhone, contactInitials);
    closeEditOverlay();
    renderContactBook();
    openBusinessCard(i);
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
        // First, compare by firstName
        let firstNameComparison = a.firstName.localeCompare(b.firstName);

        // If firstName is the same, then compare by lastName
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

    // Create an object to store div elements for each starting letter
    let letterDivs = {};

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstLetter = contact.firstName.charAt(0).toUpperCase();

        // Check if a div for the letter already exists
        if (!letterDivs[firstLetter]) {
            // If it doesn't exist, create a new div
            let letterDiv = document.createElement('div');
            letterDiv.classList.add("letterDiv");
            letterDiv.id = `letter-${firstLetter}`;
            letterDiv.innerHTML = `<h2>${firstLetter}</h2>
            <div class="letterDivBorder"></div>`;
            contactbook.appendChild(letterDiv);

            // Store the reference to the div in the object
            letterDivs[firstLetter] = letterDiv;

        }

        // // Now, you can append information about the contact to the corresponding div
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
}

/**
 * open the contact details
 */
function openContact(i) {
    let contactInfoDiv = document.getElementById("contactInfoContainer");
    document.getElementById("contactOverview").classList.add("d-noneMobile");
    document.getElementById("contactInfoContainer").classList.add("d-flex");
    document.getElementById("contactHeadlineContent").classList.add("d-flex");
    document.getElementById("backArrow").classList.add("d-flex");


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
 * This function generates the contact Informationen
 */
function genertaeContactInfo(i) {
    let contact = contacts[i];
    return /*html*/`
<div class="contactInfoContainer">

  <div class="contactInfoTop">
    <div
      class="contactInitialsInfo"
      style="background-color: ${contact.userColor};">
      ${contact.initials}
    </div>
    <div class="contactTextInfo">
      <span class="contactNameInfo"
        >${contact.firstName} ${contact.lastName}</span
      >
      <div class="manageContact">
      <div class="editContact" onclick="editContact(${i})">
        <img class="editContactImg" src="./img/editToDo.svg" alt="Edit Contact">
          Edit
        </div>
        <div class="deletContact" onclick="deletContact(${i})">
        <img class="deletContactImg" src="./img/deleteToDo.svg" alt="Delet Contact">
          Delete
        </div>
      </div>
    </div>
  </div>

  <div class="contactInfoHeadline">Contacts Informationen</div>

  <div>
    <div class="contactInfoBottom">
      <div class="contactInfoSublHead">Email</div>
      <div class="contactInfoMail">${contact.email}</div>
    </div>
    <div class="contactInfoBottom">
      <div class="contactInfoSublHead">Phone</div>
      <div>${contact.phone}</div>
    </div>
  </div>

</div>
<div id="edit"></div>

  
    `
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

    users.push(newUser)
    await setItem('users', JSON.stringify(users));

    await closeOverlay();
    await successContact();
    await InitContacts();

    let id = newUser.userID; // Use the userID of the new user
    let position = findUserPosition(id);
    openContact(position);
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


function closeMobileContactInfo() {
    document.getElementById("contactOverview").classList.remove("d-noneMobile");
    document.getElementById("contactInfoContainer").classList.remove("d-flex");
    document.getElementById("contactHeadlineContent").classList.remove("d-flex");
    document.getElementById("backArrow").classList.remove("d-flex");
}