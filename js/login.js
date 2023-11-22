let users = [];


async function register() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    users.push({
        firstName: setName('first'),
        lastName: setName('last'),
        initials: setInitials(),
        userColor: setUserColor(),
        email: email.value,
        phone: null,
        password: password.value,
        isYou: true
    });
}


function setName(names) {
    const name = document.getElementById('name').value;
    const nameTrim = name.trim();

    if (nameTrim.includes(' ')) {
        const nameArray = nameTrim.split(' ');
        if (names === 'first') {
            return nameArray[0].charAt(0).toUpperCase();
        } else if (names === 'last') {
            return nameArray[1].charAt(0).toUpperCase();
        }
    } else {
        if (names === 'first') {
            return nameTrim.chatAt(0).toUpperCase();
        } else if (names === 'last') {
            return null;
        }
    }
}


function setInitials() {
    const name = document.getElementById('name').value;
    const nameTrim = name.trim();

    if (nameTrim.includes(' ')) {
        const nameArray = nameTrim.split(' ');
        const initials = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        return initials.toUpperCase();
    } else {
        // if there is only 1 name return the first 2 characters
        const initialsFirstName = nameTrim.charAt(0) + nameTrim.charAt(1);
        return initialsFirstName.toUpperCase();
    }
}


function setUserColor() {
    const letters = '0123456789ABCDEF';
    const color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


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


function toggleCheckIcon() {
    const uncheckedIcon = document.getElementById('unchecked');
    const checkedIcon = document.getElementById('checked');

    if (uncheckedIcon) {
        uncheckedIcon.src = 'img/login/checked.svg';
        uncheckedIcon.id = 'checked';
    } else if (checkedIcon) {
        checkedIcon.src = 'img/login/unchecked.svg';
        checkedIcon.id = 'unchecked';
    }
}


function renderRegister() {
    const container = document.getElementById('container');
    const loginSignup = document.getElementById('login-signup');
    loginSignup.classList.add('d-none');
    container.innerHTML = registerHTML();
}


function renderLogin() {
    const container = document.getElementById('container');
    const loginSignup = document.getElementById('login-signup');
    loginSignup.classList.remove('d-none');
    container.innerHTML = loginHTML();
}


function registerHTML() {
    return /*html*/`
        <div class="register-card">
            <div class="arrow-container">
                <img class="arrow-icon" src="img/login/arrow-left.svg" alt="arrow left" onclick="renderLogin()">
            </div>
            <h1 class="register-heading">Sign Up</h1>
            <form class="register-form" onsubmit="register(); return false">
                <div class="register-input-container">
                    <div class="register-input-wrapper">
                        <input class="register-name-input" type="text" name="name" id="name-register" placeholder="Name" required
                        minlength="2" autocomplete="off">
                        <img class="person-icon" src="img/login/person.svg" alt="Person Icon">
                    </div>
                </div>
                <div class="register-input-container">
                    <div class="register-input-wrapper">
                        <input class="register-email-input" type="email" name="email" id="email-register" placeholder="Email" required
                        autocomplete="off">
                        <img class="email-icon" src="img/login/mail.svg" alt="Email Icon">
                    </div>
                </div>
                <div class="register-input-container">
                    <div class="register-input-wrapper" id="pw-wrapper">
                        <input class="register-pw-input" type="password" name="password-register" id="password-register" placeholder="Password"
                        minlength="8" required autocomplete="new-password" onclick="replaceLockIcon('register')">
                        <img class="lock-icon" id="lock-icon-register" src="img/login/lock.svg" alt="Password Icon">
                    </div>
                </div>
                <div class="register-input-container">
                    <div class="register-input-wrapper" id="pw-wrapper">
                        <input class="register-pw-input" type="password" name="password-confirm" id="password-confirm" placeholder="Confirm Password"
                        minlength="8" required autocomplete="new-password" onclick="replaceLockIcon('confirm')">
                        <img class="lock-icon" id="lock-icon-confirm" src="img/login/lock.svg" alt="Password Icon">
                    </div>
                </div>
                <div class="register-policy">
                <img class="unchecked-icon" src="img/login/unchecked.svg" alt="Unchecked Box" id="unchecked" onclick="toggleCheckIcon()">
                <span class="register-policy-text">I accept the <a href="../privacy_policy.html" class="register-policy-text text-blue">Privacy Policy</a></span>
                </div>
                <div class="register-button-container">
                <button type="submit" class="main-button">Sign Up</button>
                </div>
            </form>
        </div>
    `;
}


function loginHTML() {
    return /*html*/ `
        <div class="login-card">
            <h1 class="login-heading">Log in</h1>
            <form class="login-form" onsubmit="login(); return false">
                <div class="login-input-container">
                <div class="login-input-wrapper">
                    <input class="login-email-input" type="email" name="email-login" id="email-login" placeholder="Email" required
                    autocomplete="on">
                    <img class="email-icon" src="img/login/mail.svg" alt="Email Icon">
                </div>
                </div>
                <div class="login-input-container">
                <div class="login-input-wrapper" id="pw-wrapper">
                    <input class="login-pw-input" type="password" name="password-login" id="password-login" placeholder="Password"
                    required autocomplete="current-password" onclick="replaceLockIcon('login')">
                    <img class="lock-icon" id="lock-icon-login" src="img/login/lock.svg" alt="Password Icon">
                </div>
                </div>
                <div class="login-remember">
                <img class="unchecked-icon" src="img/login/unchecked.svg" alt="Unchecked Box" id="unchecked" onclick="toggleCheckIcon()">
                <span class="login-remember-text">Remember Me</span>
                </div>
                <div class="login-button-container">
                <button type="submit" class="main-button">Log in</button>
                <button type="button" class="main-button main-button-white">Guest Log in</button>
                </div>
            </form>
        </div>
    `;
}