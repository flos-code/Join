let contactInitials;

let newEmail = 0;

users = [];
let contacts = [];


async function InitContacts() {
    await init();
    await loadUsers();
    contactsAlphabetical(users);
    renderAlphabet();

    // render();
    // renderContactBook();

}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading Users error: ', e);
    }
}



function render() {
    let contactbook = document.getElementById('contactbook');
    contactbook.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        contactbook.innerHTML += `
        <div class="card"> 
          <div class="initialen">
           <img class="design-prof" src="${contact['name']}" > 
             <h2 class="author">${contact['email']}</h2>
         </div>
              <img class="imgDesign" src="${contact['phone']}"><br>
              <img class="imgDesign" src="${contact['initials']}"><br>
        
              </div>

           
            `
            ;



    }


}



// /**
// * show the overlay mask, where you can creat a new contact
// */
// function showOverlay() {
//     document.getElementById('overlay-background').classList.remove('d-none');
// }


// /**
// * close the overlay mask, where you can create a new contact
// */
// function closeOverlay() {
//     document.getElementById('overlay-background').classList.add('d-none');
//     hideEmailMessage();
//     clearInputAtOverlay();
// }


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
function closeOverlay() {
    const addContactDiv = document.getElementById('overlay-background');
    const newContactContainer = document.getElementById('overlay-container');
    newContactContainer.classList.remove('transform-0');

    setTimeout(() => {
        addContactDiv.remove();
    }, 250);
}


/**
* get the value from the diffrent inputfields and create the initials
*/
async function addNewContact() {
    let contactName = document.getElementById('new-name').value;
    let contactEmail = document.getElementById('new-email').value;
    let contactPhone = document.getElementById('new-phone').value;
    let contactInitials = contactName.match(/(\b\S)?/g).join("").toUpperCase();
    checkForDuplicate(contactName, contactEmail, contactPhone, contactInitials);
}

/**bis hier */
/**
* push contact details to the frontend Array "Contacts"
*/
async function pushContacts(contactName, contactEmail, contactPhone, contactInitials) {
    let contact = {
        'name': contactName,
        'email': contactEmail,
        'phone': contactPhone,
        'initials': contactInitials,
    }
    contacts.push(contact);
    pushContactsToBackend();
}


/**
* check if the new contact already exists by using the email of the contact
*/
function checkForDuplicate(contactName, contactEmail, contactPhone, contactInitials) {
    newEmail = 0;
    for (let i = 0; i < contacts.length; i++) {
        let existingMail = contacts[i]['email'];
        if (existingMail == contactEmail) { // check for existing users / email
            newEmail += 1;
        } else {
            newEmail += 0;
        }
        if (newEmail == 1) {
            showEmailMessage();
        }
    }
    if (newEmail == 0) {
        pushContactsToArrays(contactName, contactEmail, contactPhone, contactInitials);
    }
}


/**
* start different functions with the result of pushing contacts to arrays
*/
function pushContactsToArrays(contactName, contactEmail, contactPhone, contactInitials) {
    pushContacts(contactName, contactEmail, contactPhone, contactInitials);
    closeOverlay();
    renderContactBook();
    clearInputAtOverlay();
    openBusinessCard(contacts.length - 1);
    openBusinessCardResponsive(contacts.length - 1);
}


/**
* show a text messsage if the contact already exists
*/
function showEmailMessage() {
    document.getElementById('double-email').innerHTML = 'This contact already exists!';
}


/**
* close the text messsage
*/
function hideEmailMessage() {
    document.getElementById('double-email').innerHTML = '';
}





/**
* clear all values at inputfields
*/
function clearInputAtOverlay() {
    document.getElementById('new-name').value = '';
    document.getElementById('new-email').value = '';
    document.getElementById('new-phone').value = '';
}


/**
* render and generate HTML Code for the business card
*/
function openBusinessCard(i) {
    let card = document.getElementById('contactCard');
    card.innerHTML = generateBusinessCard(i);
}


/**
* open the contact overlay as edit mode with the current contact details
*/
function editContact(i) {
    let edit = document.getElementById('edit');
    edit.innerHTML = generateEditOverlay(i);
    document.getElementById('edit-name').value = contacts[i]['name'];
    document.getElementById('edit-email').value = contacts[i]['email'];
    document.getElementById('edit-phone').value = contacts[i]['phone'];
}


/**
* close the edit overlay mask
*/
function closeEditOverlay() {
    document.getElementById('edit-background').classList.add('d-none');
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

function contactsAlphabetical(users) {
    contacts = users.slice().sort((a, b) => {
        // First, compare by firstName
        let firstNameComparison = a.firstName.localeCompare(b.firstName);

        // If firstName is the same, then compare by lastName
        return firstNameComparison !== 0 ? firstNameComparison : a.lastName.localeCompare(b.lastName);
    });

    return contacts;
}

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

function openContact(i) {
    let contactInfoDiv = document.getElementById("contactInfoContainer");
    contactInfoDiv.innerHTML = "";
    for (let j = 0; j < contacts.length; j++) {
        let contactDiv = document.getElementById(`contact-${j}`);
        let contactName = document.getElementById(`contactName-${j}`);
        contactDiv.style = "background-color: ;"
        contactName.style = "color: ;"

    }
    let contact = contacts[i];
    let contactDiv = document.getElementById(`contact-${i}`);
    let contactName = document.getElementById(`contactName-${i}`);
    contactDiv.style = "background-color: #2A3647;"
    contactName.style = "color: white;"
    contactInfoDiv.innerHTML += genertaeContactInfo(contact, i);


}

function genertaeContactInfo(contact, i) {
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
        <div class="deletContact" onclick="deketContact(${i})">
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

  
    `
}




