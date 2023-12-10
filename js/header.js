/**
 * Setting Users array
 */
users = [];

/**
 * This function initializes and loads user contacts and Initials
 */
async function initHead() {
    await loadUsers();
    await includeHTML();
    userInitials();
    selectSidebar();
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
* generate and show logout button
*/
function showLogout() {
    document.getElementById('header-logout').innerHTML = /*html*/ `
    <div class="popup-frame-logout" id="hide-btn" onclick="hideLogout()">
        <div onclick="doNotClose(event)">
            <div class="logout-btn">
                <div class="rs-logout" onclick="openHelp()" id="idResponsive-6">Help</div>
                <div class="rs-logout" onclick="openLegalNotice()" id="idResponsive-4">Legal notice</div>
                <div class="rs-logout" onclick="openPrivacy()" id="idResponsive-5">Privacy</div>
                <div class="logout-inner-btn" onclick="logout()">Log out</div>
            </div>
        </div>
    </div>
    `;
}


/**
* hide logout button
*/
function hideLogout() {
    document.getElementById('hide-btn').classList.add('d-none');
}


/**
* stop propagation event for the logout button
*/
function doNotClose(event) {
    event.stopPropagation();
}


/**
* clear active user status and send back to index.html - log in
*/
async function logout() {
    window.open("index.html", "_self");
}


/**
* open the privacy html
*/
function openPrivacy() {
    window.open("privacy_policy.html", "_self");
}


/**
* open the help html
*/
function openHelp() {
    window.open("help.html", "_self");
}


/**
* open the legal notice html
*/
function openLegalNotice() {
    window.open("legal_notice.html", "_self");
}


/**
* Show users Initials
*/
function userInitials() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user["isYou"]) {
            document.getElementById("userInitials").innerHTML = `${user["initials"]}`;

        }
        else {
            document.getElementById("userInitials").innerHTML = "G";

        }

    }
}
