let users = [];


/**
 * add event listener for dom content loaded event to initialize functions
 */
document.addEventListener('DOMContentLoaded', async () => {
    await loadUsers();
    loadLoginData();
})


/**
 * fetch users array
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e) {
        console.error('Loading Users error:', e);
    }
}


/**
 * set all users inside the user object to false if guest login, then forward to summary
 */
async function guestLogin() {
    for (const user of users) {
        user.isYou = false;
    }
    await setItem('users', JSON.stringify(users));
    window.open('summary.html', '_self');
}


/**
 * login after check if email and password exist in the user object of users array otherwise show error
 */
async function login() {
    const emailLogin = document.getElementById('email-login');
    const passwordLogin = document.getElementById('password-login');
    
    const user = users.find(user => user.email === emailLogin.value && user.password === passwordLogin.value);
    if (user) {
        await setUserToTrue(user);
        rememberMe();
        resetLoginForm();
        window.open('summary.html', '_self');
    } else {
        loginError();
    }
}

/**
 * loggedInUser to be set to true while all others users are set to false then update users
 * @param {object} loggedInUser - stands for the logged in user
 */
async function setUserToTrue(loggedInUser) {
    for (const user of users) {
        user.isYou = false;
    }
    loggedInUser.isYou = true;
    await setItem('users', JSON.stringify(users));
}


/**
 * empty login input fields and remove login error
 */
function resetLoginForm() {
    document.getElementById('email-login').value = '';
    document.getElementById('password-login').value = '';
    removeLoginError();
}


/**
 * check all sign up fields for validity and show error messages if invalid
 */
async function signUp() {
    const emailSignup = document.getElementById('email-register');
    const passwordSignup = document.getElementById('password-register');
    const passwordConfirm = document.getElementById('password-confirm');
    const checkedIcon = document.getElementById('checked');

    if (checkEmailExists(emailSignup.value)) {
        showEmailError();
    } else {
        removeEmailError();
    }

    if (!checkEmailExists(emailSignup.value) && passwordSignup.value === passwordConfirm.value && checkedIcon) {
        await addUserToArray(emailSignup, passwordSignup);
        resetSignupForm();
        successSignUp();
    } else if (passwordSignup.value !== passwordConfirm.value && !checkedIcon){
        passwordInequal();
        errorCheckboxSignup();
    } else if (passwordSignup.value !== passwordConfirm.value && checkedIcon) {
        passwordInequal();
        removeCheckboxError();
    } else if (passwordSignup.value === passwordConfirm.value && !checkedIcon) {
        errorCheckboxSignup();
        removePasswordError();
    } else if (passwordSignup.value === passwordConfirm.value && checkedIcon) {
        removeCheckboxError();
        removePasswordError();
    }
}


/**
 * check if the email input value is already existent in dataset
 * @param {string} email - stands for the email input value
 * @returns - true/false
 */
function checkEmailExists(email) {
    for (const user of users) {
        if (user.email === email) {
            return true;
        }
    }
    return false;
}


/**
 * adding user data to array and then send post request
 * @param {element} emailSignup - stands for email input element
 * @param {element} passwordSignup - stands for password input element
 */
async function addUserToArray(emailSignup, passwordSignup) {
    signupButton('disable');
    users.push({
        firstName: setName('first'),
        lastName: setName('last'),
        initials: setInitials(),
        userColor: setUserColor(),
        email: emailSignup.value,
        phone: null,
        password: passwordSignup.value,
        isYou: false,
        userID: users.length
    });

    await setItem('users', JSON.stringify(users));
    signupButton('enable');
}


/**
 * disabling the signup button while users get saved and enabling after fetching is finished
 * @param {string} action - stands for either 'disable' or 'enable'
 */
function signupButton(action) {
    const signupBtn = document.getElementById('signup-button');

    if (action === 'disable') {
        signupBtn.disabled = true;
        signupBtn.classList.add('main-button-disabled');
    } else if (action ==='enable') {
        signupBtn.disabled = false;
        signupBtn.classList.remove('main-button-disabled');
    }
}


/**
 * empty all input fields and remove existing error messages
 */
function resetSignupForm() {
    document.getElementById('name-register').value = '';
    document.getElementById('email-register').value = '';
    document.getElementById('password-register').value = '';
    document.getElementById('password-confirm').value = '';

    removePasswordError();
    removeCheckboxError();
    toggleCheckIcon();
}


/**
 * show success Message after signing up successfully
 */
async function successSignUp() {
    const successMessage = document.getElementById('signup-success-message');
    const successOverlay = document.getElementById('signup-success-overlay');
    successOverlay.classList.add('visible');
    successMessage.classList.add('success-message-visible');
    await new Promise(resolve => setTimeout(() => {
        renderSection('login');
        resolve();
    }, 1500));
}


/**
 * get name input value and split to first and last name, else return only first name
 * @param {string} name - stands for either 'first' or 'last'
 * @returns - string with either first and last name, first name or null
 */
function setName(name) {
    const nameSignup = document.getElementById('name-register');
    const nameTrim = nameSignup.value.trim();

    if (nameTrim.includes(' ')) {
        const nameArray = nameTrim.split(' ');
        if (name === 'first') {
            return nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1);
        } else if (name === 'last') {
            return nameArray[1].charAt(0).toUpperCase() + nameArray[1].slice(1);
        }
    } else {
        if (name === 'first') {
            return nameTrim.charAt(0).toUpperCase() + nameTrim.slice(1);
        } else if (name === 'last') {
            return null;
        }
    }
}


/**
 * check if 2 names are typed in and set initials otherwise return first 2 characters if only 1 name
 * @returns - string with initials of first and last name or first 2 characters
 */
function setInitials() {
    const nameSignup = document.getElementById('name-register');
    const nameTrim = nameSignup.value.trim();

    if (nameTrim.includes(' ')) {
        const nameArray = nameTrim.split(' ');
        const initials = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        return initials.toUpperCase();
    } else {
        const initialsFirstName = nameTrim.charAt(0) + nameTrim.charAt(1);
        return initialsFirstName.toUpperCase();
    }
}


/**
 * generate random color hex code for signed up user
 * @returns - string of color hex code
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
 * replace the lock icon with visibility off icon for password field and add event listener for blur event
 * @param {string} section - stands for the current section in html
 */
function replaceLockIcon(section) {
    const lockIcon = document.getElementById(`lock-icon-${section}`);

    if (lockIcon) {
        lockIcon.src = 'img/login/visibility_off.svg';
        lockIcon.className = 'visibility-icon';
        lockIcon.setAttribute('onclick', `togglePasswordVisibility('${section}')`);
        lockIcon.id = `visibility-icon-${section}`;
    }
    document.getElementById(`password-${section}`).addEventListener('blur', () => {
        checkPassword(`${section}`)
    });
}


/**
 * toggle between visibility off / on icon and make password visible
 * @param {string} section - stands for current section in html
 */
function togglePasswordVisibility(section) {
    const passwordField = document.getElementById(`password-${section}`);
    const visibilityIcon = document.getElementById(`visibility-icon-${section}`);

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        visibilityIcon.src = 'img/login/visibility_on.svg';
    } else {
        passwordField.type = 'password';
        visibilityIcon.src = 'img/login/visibility_off.svg';
    }
}


/**
 * when input field looses focus, blur event fires and the input gets to it default state
 * @param {string} section - stands for current section in html
 */
function checkPassword(section) {
    const visibilityIcon = document.getElementById(`visibility-icon-${section}`);
    const passwordField = document.getElementById(`password-${section}`);

    if (!passwordField.value) {
        if (visibilityIcon) {
            visibilityIcon.src = 'img/login/lock.svg';
            visibilityIcon.className = 'lock-icon';
            visibilityIcon.id = `lock-icon-${section}`;
        }
        if (passwordField.type === 'text') {
            passwordField.type = 'password';
        }
    }
}


/**
 * toggle between checked and unchecked checkbox icon
 */
function toggleCheckIcon() {
    const uncheckedIcon = document.getElementById('unchecked');
    const checkedIcon = document.getElementById('checked');

    if (uncheckedIcon) {
        uncheckedIcon.src = 'img/login/checked.svg';
        uncheckedIcon.id = 'checked';
    } else if (checkedIcon) {
        checkedIcon.src = 'img/login/unchecked.svg';
        checkedIcon.id = 'unchecked';
        unrememberMe();
    }
}


/**
 * log in data will be remembered for the next session if opt in
 */
function rememberMe() {
    const checkedIcon = document.getElementById('checked');
    const email = document.getElementById('email-login');
    const password = document.getElementById('password-login');

    if (checkedIcon) {
        if (email.value && password.value) {
            localStorage.setItem('email', email.value);
            localStorage.setItem('password', password.value);
        }
    }
}


/**
 * if user checked remember me his log in data will be inserted onload
 */
function loadLoginData() {
    const email = document.getElementById('email-login');
    const password = document.getElementById('password-login');
    const emailSaved = localStorage.getItem('email');
    const passwordSaved = localStorage.getItem('password');

    if (emailSaved && passwordSaved) {
        email.value = emailSaved;
        password.value = passwordSaved;
    }
}


/**
 * delete users log in data from local storage
 */
function unrememberMe() {
    const emailSaved = localStorage.getItem('email');
    const passwordSaved = localStorage.getItem('password');

    if (emailSaved && passwordSaved) {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }
}


/**
 * render the html for the login / signup
 * @param {string} section - stands for either 'register' or 'login'
 */
function renderSection(section) {
    const container = document.getElementById('container');
    const loginSignup = document.getElementById('login-signup');

    if (section === 'register') {
        loginSignup.classList.add('d-none');
        container.innerHTML = registerHTML();
    } else if (section === 'login') {
        loginSignup.classList.remove('d-none');
        container.innerHTML = loginHTML();
    }
}