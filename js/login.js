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
function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value)
    if (user) {
        loginGuest()
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
function loginGuest() {
    window.location.href = "summary.html";
    users.name = 'guest'
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


