/**
 * Wait for include html code
 */
async function init() {
    await includeHTML();
}


/**
 * Include HTML Templates
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "include html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    // await downloadFromServer(); // wait for server
    // activeUserAsJson = localStorage.getItem('activeUser');
    // activeUser = JSON.parse(activeUserAsJson) || [];
    //activeUser = JSON.parse(backend.getItem('activeUser')) || [];
}
