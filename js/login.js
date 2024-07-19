/* This line is creating a new URLSearchParams object named `urlParams` by parsing the query string parameters from the current URL of the window. */
const urlParams = new URLSearchParams(window.location.search);


/** The `init` function asynchronously initializes the webpage by adding a CSS class for animation, loading user data and online status, and autofilling a form. */
async function initLogin() {
    document.getElementById('imgJoin');
    document.body.classList.add('animation');
    show();
    await loadUsers();
    await loadOnlineStatus();
    autoFillForm();
}


/** This function is responsible for displaying or hiding certain elements on the webpage based on the screen size. */
function show() {
    let box = document.getElementById('topBox');
    let bodyAnimation = document.getElementById('bodyAnimation');
    let img = document.getElementById('imgJoin');
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) {
        showMatchingTimeouts(box, bodyAnimation, img);
    } else {
        setTimeout(() => { bodyAnimation.style.display = 'none' }, 0)
        setTimeout(() => { box.style.display = 'flex'; }, 1000);
        setTimeout(() => { bodyAnimation.style.display = 'block' }, 1500)
    }
};


/** This function adds style properties to specified elements. */
function showMatchingTimeouts(box, bodyAnimation, img) {
    setTimeout(() => { bodyAnimation.style.display = 'none' }, 0);
    setTimeout(() => {
        document.body.style.backgroundColor = "#2b3646";
        img.src = './assets/img/joinwhite.png'
    }, 10);
    setTimeout(() => {
        box.style.display = 'flex';
        document.body.style.backgroundColor = '#f6f7f8';
        img.src = './assets/img/joinblue.png'
    }, 1000);
    setTimeout(() => { bodyAnimation.style.display = 'block' }, 1500)
}


/** This function checks if a user has already signed up and verifies whether email and password are correct. */
async function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value)
    if (user) {
        loggedInUsers.unshift(user.name);
        await setItem('loggedInUsers', JSON.stringify(loggedInUsers));
        window.location.href = "summary.html";
    } else {
        document.getElementById('msgBoxLogin').innerHTML = 'Password Incorrect!!!';
        document.getElementById('msgBoxLogin').style.display = 'flex';
        document.getElementById('pwError').classList.add('pwError');
        localStorage.setItem('isLoggedIn', 'false');
    }
    rememberMe();
}


/** This function redirects to the board page when using the guest login. */
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


/** This function clears all input after submitting the form. */
function emptyForm() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

/** This function checks if rememberMe is selected and if so it saves the credentials in the local storage. */
function rememberMe() {
    let rememberCheckbox = document.getElementById('checkbox');
    if (rememberCheckbox.checked) {
        localStorage.setItem('rememberEmail', document.getElementById('email').value);
        localStorage.setItem('rememberPassword', document.getElementById('password').value);
    }
    else {
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');
    }
}


/** This function autmatically fills in the saved credentials if they were saved beforehand. */
function autoFillForm() {
    let rememberedEmail = localStorage.getItem('rememberEmail');
    let rememberedPassword = localStorage.getItem('rememberPassword');
    if (rememberedEmail && rememberedPassword) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('password').value = rememberedPassword;
        document.getElementById('checkbox').checked = true;
    }
}


/** This function changes the visibility of the password. */
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


/** This function changes the visibility of the confirm password. */
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


/** This event listener checks if you are logged in to get redirected on protected links. */
document.querySelectorAll('.protected-link').forEach(link => {
    link.addEventListener('click', function (event) {
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            event.preventDefault();
            alert('You must be logged in to view this page!');
        }
    });
});