/** These lines define the elements for password, name and email. */
let passwordReg = document.getElementById('passwordInput');
let passwordConfirmReg = document.getElementById('passwordConfirmInput');
let namesReg = document.getElementById('namesInput');
let emailReg = document.getElementById('emailInput');


/** This function loads the users on initilization. */
async function initReg() {
    await loadUsers();
}


/** This function checks if both passwords are identical and then saves the information. */
async function register() {
    if (passwordReg.value !== passwordConfirmReg.value) {
        alert('Passwords are not the same');
        return;
    }
    signBtn.disabled = true;
    users.push({
        name: namesReg.value,
        email: emailReg.value,
        password: passwordReg.value,
    });
    await setItem('users', JSON.stringify(users));
    msg();
    resetForm();
    backToLogin();
}


/** This function generates a message if the signup was successful. */
function msg() {
    document.getElementById('msgBox').innerHTML = 'You Signed Up successfully';
    document.getElementById('msgBox').style.display = 'flex';

}


/** This funcion redirects to the login page after successful signup. */
function backToLogin() {
    setTimeout(function () {
        window.location.href = "logIn.html";
    }, 3000);

}


/** This function resets the input fields after the form has been submitted. */
function resetForm() {
    namesReg.value = ''
    emailReg.value = '';
    passwordReg.value = '';
    passwordConfirmReg.value = '';
    signBtn.disabledReg = false;
}


/** This function toggles the visibility of the password. */
function showPassword() {
    let password = document.getElementById('passwordInput');
    if (password.type === 'password') {
        password.type = 'text';
        document.getElementById('passwordImg').src = "./assets/img/visibility_off.png"
    }
    else {
        password.type = 'password';
        document.getElementById('passwordImg').src = "./assets/img/lock.png"
    }
}


/** This function toggles the visibility of the confirm password. */
function showPasswordConfirm() {
    let passwordConfirm = document.getElementById('passwordConfirmInput');
    if (passwordConfirm.type === 'password') {
        passwordConfirm.type = 'text';
        document.getElementById('passwordImgConfirm').src = "./assets/img/visibility_off.png"
    }
    else {
        passwordConfirm.type = 'password';
        document.getElementById('passwordImgConfirm').src = "./assets/img/lock.png";
    }
}