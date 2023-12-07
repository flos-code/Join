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
}



/**
 * sets the current page active on the sidebar
 */
function selectSidebar() {
    let currentPage = window.location.pathname;
    let idMappings = {
        '/Join/summary.html': ['id-0', 'idResponsive-0'],
        '/Join/board.html': ['id-1', 'idResponsive-1'],
        '/Join/task.html': ['id-2', 'idResponsive-2'],
        '/Join/contacts.html': ['id-3', 'idResponsive-3'],
        '/Join/legal_notice.html': ['id-4'],
        '/Join/privacy_policy.html': ['id-5'],
        '/Join/legal_notice_out.html': ['id-6'],
        '/Join/privacy_policy_out.html': ['id-7']
    };

    let ids = idMappings[currentPage];

    if (ids) {
        ids.forEach(id => {
            document.getElementById(id).classList.add("active");
        });
    }
}