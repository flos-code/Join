// ############## CONTACTS TEMPLATES ################# //

/**
 * return html for adding a new contact
 * 
 * @returns string with the html
 */
function addNewContactHTML() {
    return /*html*/`
        <div class="overlay-bg" id="overlay-background" onclick="closeOverlay()">
            <div class="addContactContainer" id="overlay-container" onclick="event.stopPropagation()">
                <div class="addContactLeftPart">
                    <img class="addContactJoinLogo" src="./img/join-logo.svg">
                    <div class="overlayHeadline">Add contact</div>
                    <div class="textTasksAre">Tasks are better with a team!</div>
                    <div class="textTasksAre-border"></div>
                </div>
                <div class="addContactRightPart">
                    <img class="closeAddContact" src="./img/close-grey.svg" onclick="closeOverlay()">
                    <img class="closeAddContact-rs" src="./img/cancel-white.svg" onclick="closeOverlay()">
                    <div class="userInfo">
                        <img class="userWhiteIcon" src="./img/persona.svg">
                        <form id="addContactFrom" onsubmit="addNewContact(); return false;">
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
                                <div class="overlay-cancel-btn" onclick="closeOverlay()">
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

/**
 * return the edit overlay for the selected contact
 * 
 * @param {number} i - number of selected cintact to edit
 * @returns string with the html
 */
function generateEditOverlay(i) {
    return /*html*/ `
    <div onclick="closeEditOverlay()" class="overlay-bg" id="edit-background">
        <div class="addContactContainer" id="overlay-container" onclick="event.stopPropagation()">
            <div class="addContactLeftPart">
                <img class="addContactJoinLogo" src="./img/logo.png">
                <div class="overlayHeadline">Edit contact</div>
                <div class="textTasksAre-border"></div>
            </div>
            <div class="addContactRightPart">
                <img class="closeAddContact" src="./img/cancel-icon.png" onclick="closeEditOverlay()">
                <img class="closeAddContact-rs" src="./img/cancel-white.svg" onclick="closeEditOverlay()">
                <div class="userInfo">
                    <div class="overlay-user-initials-container">
                        <div style="background-color: ${contacts[i]["userColor"]};" class="overlay-user-initials">${contacts[i]['initials']}</div>
                    </div>

                    <form class="save-contact-form" onsubmit="saveContact(${i}); return false;">
                        <div class="contactDetailsContainer">
                            <div class="contactsDetailsFrame">
                                <input id="edit-name" class="style-input styleUserIcon" required type="text"
                                placeholder="Name">
                            </div>
                            <div class="contactsDetailsFrame">
                                <input id="edit-email" class="style-input styleUserLetter" required type="email"
                                placeholder="Email">
                            </div>
                            <div class="contactsDetailsFrame">
                            <input id="edit-phone" class="style-input input-icon-phone" placeholder="Phone"
                             required type="text" oninput="validateInput(this)">
                            </div>
                        </div>
                        <div class="manageEditContact">
                        <div class="deletContactEdit" onclick="deletContact(${i})">Delete</div>
                        <button class="overlay-save-frame">
                            <div class="overlay-save-btn">
                                <div class="overlay-save-btn-text">Save</div>
                                <div class="saveEditImg"><img src="./img/check.svg" alt="Save Edited Contact"></div>
                     
                            </div>
                        </button>
                        </div>
                     
                    </form>


                    <form class="edit-responsive-form" onsubmit="saveContactResponsive(${i}); return false;">
                        <div class="contactDetailsContainer">
                            <div class="contactsDetailsFrame">
                                <input id="edit-name-rs" class="style-input styleUserIcon" required type="text"
                                placeholder="Name">
                            </div>
                            <div class="contactsDetailsFrame">
                                <input id="edit-email-rs" class="style-input styleUserLetter" required type="email"
                                placeholder="Email">
                            </div>
                            <div class="contactsDetailsFrame">
                                <input id="edit-phone-rs"  class="style-input input-icon-phone" required
                                placeholder="Phone" type="text" oninput="validateInput(this)">
                            </div>
                        </div>
                        <button class="overlay-save-frame">
                            <div class="overlay-save-btn">
                                <div class="overlay-save-btn-text">Save</div>
                            </div>
                        </button>
                    </form>
            </div>
        </div>
    </div>
`;
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