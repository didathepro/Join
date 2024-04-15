const urlParams = new URLSearchParams(window.location.search);

function init() {
    document.getElementById('imgJoin');
    document.body.classList.add('animation');
    show();
}

function show() {
    let box = document.getElementById('topBox');
    let bodyAnimation = document.getElementById('bodyAnimation');
    setTimeout(() => {
        bodyAnimation.style.display = 'none'
    }, 0)
    setTimeout(() => {
        box.style.display = 'flex';
    }, 1000);
    setTimeout(() => {
        bodyAnimation.style.display = 'block'
    }, 1500)
};

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value)
    if (user) {
        loginGuest()
    } else {
        console.log('User not found');
    }
    emptyForm();
}

function loginGuest() {
    window.location.href = "board.html";
}

function emptyForm() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}



