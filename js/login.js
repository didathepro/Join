const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
const STORAGE_TOKEN = 'K9SFYBX0R1WD1NS9ZKIOB4W1CL157WB4C579A62K';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

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


if (msg) {
    msgBox.innerHTML = msg;
} else {
    //display none;
}

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value)
    if (user) {
        console.log('User Gefunden');
    }
}

