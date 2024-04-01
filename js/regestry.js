let users = [{
    name: 'test',
    email: 'test@gmail.com',
    password: 'est123'
}]

function validate() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let name = document.getElementById('name');
    users.push({ name: name.value, email: email.value, password: password.value })
    // weiterleitung als eingeloggter Benutzer an die Login Site
    window.location.href = 'login.html?msg=Du hast dich Erfolgreich regestriert'
}