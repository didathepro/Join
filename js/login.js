const urlParams = new URLSearchParams(window.location.search);
/**
 * Initialiert body onload
 * start Intro Animation of Join Logo
 * load User from Localstorage
 * load Autofill when already have account and set up "RememberMe"
 */

async function init() {
    document.getElementById('imgJoin');
    document.body.classList.add('animation');
    show();
    await loadUsers();
    await loadOnlineStatus();
    autoFillForm();
}

/**
 * loading Animation with a TimeOut Function for Desktop and Mobile
 */
function show() {
    let box = document.getElementById('topBox');
    let bodyAnimation = document.getElementById('bodyAnimation');
    let img = document.getElementById('imgJoin');
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) {
        setTimeout(() => {
            bodyAnimation.style.display = 'none'

        }, 0);
        setTimeout(() => {
            document.body.style.backgroundColor = "#2b3646";
            img.src = './assets/img/joinwhite.png'
        }, 10);
        setTimeout(() => {
            box.style.display = 'flex';
            document.body.style.backgroundColor = '#f6f7f8';
            img.src = './assets/img/joinblue.png'

        }, 1000);
        setTimeout(() => {
            bodyAnimation.style.display = 'block'
        }, 1500)

    } else {
        setTimeout(() => {
            bodyAnimation.style.display = 'none'
        }, 0)
        setTimeout(() => {
            box.style.display = 'flex';
        }, 1000);
        setTimeout(() => {
            bodyAnimation.style.display = 'block'
        }, 1500)
    }

};

/**
 * this function checks when User already SignUp and is email and password correct
 */
async function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value)
    if (user) {
        loggedInUsers.unshift(user.name);
        await setItem('loggedInUsers', JSON.stringify(loggedInUsers));
        window.location.href = "summary.html";

    } else {
        document.getElementById('msgBoxLogin').innerHTML = 'Email or Password Incorect!!!';
        document.getElementById('msgBoxLogin').style.display = 'flex';
    }

    rememberMe()
    emptyForm();
}

/**
 * when you choose the Guest LogIn then you will directly come to the Board.html
 */
async function loginGuest() {
    const guestEmail = 'guest123@da.de';
    const guestPassword = '123';
    let user = users.find(u => u.email == email.value && u.password == password.value)
    document.getElementById('email').value = guestEmail;
    document.getElementById('password').value = guestPassword;
    loggedInUsers.unshift(user.name);
    await setItem('loggedInUsers', JSON.stringify(loggedInUsers));
    window.location.href = "summary.html";
    emptyForm();
}

/**
 * clears all Input after submit the Form
 */
function emptyForm() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

/**
 * first check when rememberMe is checked, when yes then save Data in LocalStorage, otherwise none
 */
function rememberMe() {
    let rememberCheckbox = document.getElementById('checkbox');
    if (rememberCheckbox.checked) {
        localStorage.setItem('rememberEmail', document.getElementById('email').value);
        localStorage.setItem('rememberPassword', document.getElementById('password').value);
    } else {
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');
    }
}

/**
 * when remeberMe was Checked the Autofill will automatic saved on your Computer LocalStorage
 */
function autoFillForm() {
    let rememberedEmail = localStorage.getItem('rememberEmail');
    let rememberedPassword = localStorage.getItem('rememberPassword');
    if (rememberedEmail && rememberedPassword) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('password').value = rememberedPassword;
        document.getElementById('checkbox').checked = true;
    }
}

/**
 * this function show up and visible your password while you type onclick on the Image
 */
function showPassword() {
    let password = document.getElementById('password');

    if (password.type === 'password') {
        password.type = 'text';
        document.getElementById('passwordImg').src = "./assets/img/visibility_off.png"

    }
    else {
        password.type = 'password';
        document.getElementById('passwordImg').src = "./assets/img/lock.png"
    }
}

/**
 * this function is Similar to showPassword() function but only for the ConfirmPassword
 */
function showPasswordConfirm() {
    let passwordConfirm = document.getElementById('passwordConfirm');

    if (passwordConfirm.type === 'password') {
        passwordConfirm.type = 'text';
        document.getElementById('passwordImgConfirm').src = "./assets/img/visibility_off.png"
    }
    else {
        passwordConfirm.type = 'password';
        document.getElementById('passwordImgConfirm').src = "./assets/img/lock.png";
    }
}

