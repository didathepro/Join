let users = [{
    name: 'test',
    email: 'test@gmail.com',
    password: 'est123'
}]

let passwordConfirm = document.getElementById('passwordConfirm');

async function initReg() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function register() {
    if (password !== passwordConfirm) {
        alert('Passwords are not the same');
        return;
    }

    signBtn.disabled = true;
    users.push({
        name: names.value,
        email: email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));

    msg();
    resetForm();
    backToLogin();

}

function msg() {
    document.getElementById('msgBox').innerHTML = 'You Signed Up successfully';
    document.getElementById('msgBox').style.display = 'flex';

}

function backToLogin() {
    setTimeout(function () {
        window.location.href = "login.html";
    }, 3000);

}

function resetForm() {
    names.value = ''
    email.value = '';
    password.value = '';
    passwordConfirm.value = '';
    signBtn.disabled = false;
}

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

