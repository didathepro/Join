/* The code snippet is initializing two arrays: `users` and `loggedInUsers`. */
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


/** The function `loadUsers` asynchronously loads user data from storage and handles any errors that may occur. */
async function loadUsers() {
    try { users = JSON.parse(await getItem('users')); }
    catch (e) { console.error('Loading error:', e); }
}


/** The function `loadOnlineStatus` asynchronously loads the logged-in users' online status by parsing JSON data retrieved from a storage item, handling errors if any occur. */
async function loadOnlineStatus() {
    try { loggedInUsers = JSON.parse(await getItem('loggedInUsers')); }
    catch (e) { console.error('Loading error:', e); }
}