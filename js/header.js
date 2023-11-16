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




