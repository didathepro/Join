/** The `initSummary` function initializes, shows a summary name, and greets the user asynchronously. */
async function initSummary() {
    await init();
    showSummaryName();
    greet();
}

/** The `init` function includes HTML, adds background, loads users and online status, and sets the current user. */
async function init() {
    await includeHTML();
    addBg();
    await loadUsers();
    await loadOnlineStatus();
    currentUser();
}


/** The function `showSummaryName` retrieves the name of the first logged-in user and displays it in the element with the id 'nameSummary'. */
function showSummaryName() {
    let name = document.getElementById('nameSummary');
    name.innerHTML = loggedInUsers[0];
}


/** The function `addBg` adds a dark-blue background and disables pointer events for specific elements on different pages based on the current page URL. */
function addBg() {
    let currentPage = window.location.pathname;
    let maps = {
        '/summary.html': { 'default': ['summary'], 'responsive': ['summaryRes'] },
        '/addTask.html': { 'default': ['tasks'], 'responsive': ['tasksRes'] },
        '/board.html': { 'default': ['board'], 'responsive': ['boardRes'] },
        '/contacts.html': { 'default': ['contacts'], 'responsive': ['contactsRes'] },
        '/help.html': { 'default': [], 'responsive': [] }
    };
    let ids = maps[currentPage] || { 'default': [], 'responsive': [] };
    let defaultIds = ids['default'];
    let responsiveIds = ids['responsive'];
    defaultIds.forEach(element => { addBgCss(); });
    responsiveIds.forEach(element => { addBgCss(); });
}


/** The function `abc` adds a class and disables pointer events on a specified element in the document. */
function addBgCss() {
    let elementRef = document.getElementById(element);
    if (elementRef) {
        elementRef.classList.add("dark-blueBg");
        elementRef.style.pointerEvents = "none";
    }
}


/** The `dropDown` function in JavaScript creates a dropdown menu with links and a log out option, and toggles its visibility based on user interaction. */
function dropDown() {
    let content = document.getElementById("dropdown");
    content.innerHTML = "";
    if (content.classList.contains("d-none")) { content.classList.remove("d-none"); }
    content.innerHTML += /*html*/`
        <div class="dropdown-container">
            <a href="help.html">Help</a>
            <a href="legalNotice.html">Legal Notice</a>     
            <a href="privacyPolicy.html">Privacy Policy</a>     
            <a id="logOut" onclick="logOut()"href="logIn.html">Log out</a>     
        </div>
    `;
    document.addEventListener('mouseup', function (e) {
        if (!content.contains(e.target)) { content.classList.add('d-none'); }
    });
}


/** The function `includeHTML` asynchronously includes HTML content from external files into elements with a specific attribute, handling errors if the file is not found. */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) { element.innerHTML = await resp.text(); }
        else { element.innerHTML = 'Page not found'; }
    }
}


/** The `logOut` function clears the `loggedInUsers` array, saves it to local storage, and redirects the user to the login page. */
async function logOut() {
    try {
        loggedInUsers.length = 0;
        await setItem('loggedInUsers', JSON.stringify(loggedInUsers));
        window.location.href = "../login.html";
    }
    catch (error) { console.error("Logout failed:", error); }
}


/** The function `currentUser` sets the first letter of the name of the logged-in user as the inner HTML of an element with the ID 'navHeader'. */
function currentUser() {
    let iconName = document.getElementById('navHeader');
    if (loggedInUsers && loggedInUsers.length > 0 && loggedInUsers[0]) {
        iconName.innerHTML = loggedInUsers[0].charAt(0).toUpperCase();
    } else {
        console.error("No logged in user found");
    }
}


/** The function `contentToBoard` redirects the user to the `board.html` page when called. */
function contentToBoard() {
    window.location.href = 'board.html';
}


/** The function `loadUsers` asynchronously loads a list of logged-in users with a default user initially set. */
async function loadUsers() {
    loggedInUsers = ['defaultUser'];
}


/** The function `loadOnlineStatus` is designed to asynchronously load the online status. */
async function loadOnlineStatus() {
    // Load online status here
}