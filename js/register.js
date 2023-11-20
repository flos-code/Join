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
        // TODO html attribute minlength="2"
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