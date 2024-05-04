let passwordReg = document.getElementById('passwordInput');
let passwordConfirmReg = document.getElementById('passwordConfirmInput');
let namesReg = document.getElementById('namesInput');
let emailReg = document.getElementById('emailInput');


/**
 * Inizialiesiert Body Onload and load UserData
 */
async function initReg() {
    await loadUsers();
}

/**
 * load Usere from LocalStorageServer
 */

/**
 * checked first password and passwordConfirm are the Same
 * @returns if false then alert will show Up to Message you
 * when all Correct, Data will be Saved on LocalStorage to a JSON;
 */
async function register() {
    const password = passwordReg.value;
    const passwordConfirm = passwordConfirmReg.value;
    const name = namesReg.value;
    const email = emailReg.value;

    if (password !== passwordConfirm) {
        alert('Passwords are not the same');
        return;
    }

    signBtn.disabled = true;
    users.push({
        name: name,
        email: email,
        password: password,
    });
    await setItem('users', JSON.stringify(users));

    msg();
    resetForm();
    backToLogin();
}

/**
 * if the Regestration was Successfull then a message will show UP
 */
function msg() {
    document.getElementById('msgBox').innerHTML = 'You Signed Up successfully';
    document.getElementById('msgBox').style.display = 'flex';

}

/**
 * this function will bring you back to Login site after successful regestration
 */
function backToLogin() {
    setTimeout(function () {
        window.location.href = "login.html";
    }, 3000);

}

/**
 * after submit succesfull the Form, all Inputs will be rested
 */
function resetForm() {
    namesReg.value = ''
    emailReg.value = '';
    passwordReg.value = '';
    passwordConfirmReg.value = '';
    signBtn.disabledReg = false;
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

