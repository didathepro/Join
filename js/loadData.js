let users = [{
    name: 'test',
    email: 'test@gmail.com',
    password: 'est123'
},

{
    name: 'guest',
    email: 'guest123@da.de',
    password: '123',
}];

let loggedInUsers = [];

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function loadOnlineStatus() {
    try {
        loggedInUsers = JSON.parse(await getItem('loggedInUsers'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}