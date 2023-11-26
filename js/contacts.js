let contactInitials;

let newEmail = 0;



let contacts = [ 
    
   
    {
        name: 'sonja',
        email: 't.wolf@gmail.com',
        phone: '+49 1111 111 11 9',
        initials: 'SW',
    },
   
    {
        name: 'Tatjana',
        email: 't.wolf@gmail.com',
        phone: '+49 1111 111 11 9',
        initials: 'TW',
        
    },
    {
        name: 'ANA WOLF',
        email: 't.wolf@gmail.com',
        phone: '+49 1111 111 11 9',
        initials: 'AW',
        
    },
    {
        name: 'ANDRE WOLF',
        email: 't.wolf@gmail.com',
        phone: '+49 1111 111 11 9',
        initials: 'TW',
        
    },

];

loadContactsFromBackend();



async function InitContacts() {
    await init();
    await initStart();
    await loadContactsFromBackend();
    renderContactBook();
    if (contacts > [])
        openBusinessCard(0);
}

/**
* show the overlay mask, where you can creat a new contact
*/
function showOverlay() {
    document.getElementById('overlay-background').classList.remove('d-none');
}


/**
* close the overlay mask, where you can create a new contact
*/
function closeOverlay() {
    document.getElementById('overlay-background').classList.add('d-none');
    hideEmailMessage();
    clearInputAtOverlay();
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
* render and generate HTML Code for the contact book
*/
function renderContactBook() {
    let container = document.getElementById('contact-book');
    container.innerHTML = '';
    for (let index = 0; index < contacts.length; index++) {
        container.innerHTML += generateHTMLforContactBook(index);
    }
    renderContactBookResponsive();
    addActiveClass3();
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
* save the updated contact details to the frontend array contacts
*/
function updateContatcs(i, contactName, contactEmail, contactPhone, contactInitials) {
    contacts[i]['name'] = contactName
    contacts[i]['email'] = contactEmail
    contacts[i]['phone'] = contactPhone
    contacts[i]['initials'] = contactInitials
    pushContactsToBackend();

}


/**
* save the contacts Array to the backend and use the user name as key
*/
function pushContactsToBackend() {
    let key = activeUser[0];
    backend.setItem(key, JSON.stringify(contacts));
}


/**
* load the contacts array for the user from backend Server
*/
function loadContactsFromBackend() {
    let key = activeUser[0];
    contacts = JSON.parse(backend.getItem(key)) || [];
}



/*
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
} */


/**
* delete the actual contact in front- and backend
*/
function deleteContact(i) {
    contacts.splice(i, 1);
    renderContactBook();
    renderContactBookResponsive();
    pushContactsToBackend();
    document.getElementById('contactCard-main').style.display = 'none';
}

//Responsive js//

/**
* show the overlay mask for creating new contacts
*/
function showOverlayResponsive() {
    showOverlay();
    document.getElementById('contact-book-rs').style.display = 'none';
    document.getElementById('addContactBtn-rs').classList.add('d-none');
    document.getElementById('contactInfo').classList.remove('d-none');
    document.getElementById('contactHeadlineContent').style.display = 'flex';
    document.getElementById('contactCard-main').style.display = 'flex';
    
}


/**
* close the overlay mask for creating new contacts
*/
function closeOverlayResponsive() {
    closeOverlay();
    backToContacts();
}


/**
* send you back to the contactbook
*/
function backToContacts() {
    document.getElementById('contact-book-rs').style.display = 'flex';
    document.getElementById('addContactBtn-rs').classList.remove('d-none');
    document.getElementById('moveBackBtn').classList.add('d-none');
    document.getElementById('contactInfo').classList.add('d-none');
    document.getElementById('contactHeadlineContent').style.display = 'none';
    document.getElementById('contactCard-main').style.display = 'none';
}


/**
* render and generate HTML Code for the contactbook in responsive mode
*/
function renderContactBookResponsive() {
    let container = document.getElementById('contact-book-rs');
    container.innerHTML = '';
    for (let index = 0; index < contacts.length; index++) {
        container.innerHTML += generateHTMLforContactBookResponsive(index);
    }
}


function genereateRandomColor() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.getElementById('contactCircleBgColor' + i).style.background = `#${randomColor} !important`;
}

/**
* render and generate HTML Code for the businesscard in responsive mode
*/
function openBusinessCardResponsive(i) {
    openBusinessCard(i);
    document.getElementById('contact-book-rs').style.display = 'none';
    document.getElementById('addContactBtn-rs').classList.add('d-none');
    document.getElementById('contactInfo').classList.remove('d-none');
    document.getElementById('contactHeadlineContent').style.display = 'flex';
    document.getElementById('contactCard-main').style.display = 'flex';

}

/**
* add back button
*/
function addBackButton() {
    document.getElementById('moveBackBtn').classList.remove('d-none')
}


/**
* close edit overlay mask for updating contacts
*/
function closeEditOverlayResponsive() {
    closeEditOverlay();
}


/**
* update the contacts in responsive mode
*/
async function saveContactResponsive(i) {
    let contactName = document.getElementById('edit-name-rs').value;
    let contactEmail = document.getElementById('edit-email-rs').value;
    let contactPhone = document.getElementById('edit-phone-rs').value;
    let contactInitials = contactName.match(/(\b\S)?/g).join("").toUpperCase();
    await updateContatcs(i, contactName, contactEmail, contactPhone, contactInitials);
    closeEditOverlay();
    renderContactBookResponsive();
    openBusinessCardResponsive(i);
   // document.getElementById('moveBackBtn').classList.remove('d-none');//
}


/**
* open edit overlay mask for updating contacts
*/
function editContactResponsive(i) {
    let edit = document.getElementById('edit');
    edit.innerHTML = generateEditOverlay(i);
    document.getElementById('edit-name-rs').value = contacts[i]['name'];
    document.getElementById('edit-email-rs').value = contacts[i]['email'];
    document.getElementById('edit-phone-rs').value = contacts[i]['phone'];
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