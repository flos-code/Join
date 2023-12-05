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


// function selectSidebar() {
//     let currentPage = window.location.pathname;
//     let id;
//     let responsiveId;

//     if (currentPage == "/summary.html") {
//         id = "id-0"
//         responsiveId = "idResponsive-0";
//     } else if (currentPage == "/board.html") {
//         id = "id-1"
//         responsiveId = "idResponsive-1";
//     } else if (currentPage == "/task.html") {
//         id = "id-2"
//         responsiveId = "idResponsive-2";
//     } else if (currentPage == "/contacts.html") {
//         id = "id-3"
//         responsiveId = "idResponsive-3";
//     } else if (currentPage == "/legal_notice.html") {
//         id = "id-4"
//     } else if (currentPage == "/privacy_policy.html") {
//         id = "id-5"
//     } else if (currentPage == "/legal_notice_out.html") {
//         id = "id-6"
//     } else if (currentPage == "/privacy_policy_out.html") {
//         id = "id-7"
//     }



//     document.getElementById(id).classList.add("active");
//     if (responsiveId) {
//         document.getElementById(responsiveId).classList.add("active");
//     }
// }

function selectSidebar() {
    let currentPage = window.location.pathname;
    let idMappings = {
        '/summary.html': ['id-0', 'idResponsive-0'],
        '/board.html': ['id-1', 'idResponsive-1'],
        '/task.html': ['id-2', 'idResponsive-2'],
        '/contacts.html': ['id-3', 'idResponsive-3'],
        '/legal_notice.html': ['id-4'],
        '/privacy_policy.html': ['id-5'],
        '/legal_notice_out.html': ['id-6'],
        '/privacy_policy_out.html': ['id-7']
    };

    let ids = idMappings[currentPage];

    if (ids) {
        ids.forEach(id => {
            document.getElementById(id).classList.add("active");
        });
    }
}