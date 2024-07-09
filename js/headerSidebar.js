async function initSummary() {
    await init();
    showSummaryName();
}
 
async function init() {
    await includeHTML();
    addBg();
    await loadUsers();
    await loadOnlineStatus();
    currentUser();
}

function showSummaryName (){
    let name = document.getElementById('nameSummary');
    name.innerHTML = loggedInUsers[0];

}

function addBg() {
    let currentPage = window.location.pathname;

    let maps = {
        '/summary.html': {
            'default': ['summary'],
            'responsive': ['summaryRes']
        },
        '/addTask.html': {
            'default': ['tasks'],
            'responsive': ['tasksRes']
        },
        '/board.html': {
            'default': ['board'],
            'responsive': ['boardRes']
        },
        '/contacts.html': {
            'default': ['contacts'],
            'responsive': ['contactsRes']
        },
        '/help.html': {
            'default': [],
            'responsive': []
        }
    };

    let ids = maps[currentPage] || { 'default': [], 'responsive': [] };
    let defaultIds = ids['default'];
    let responsiveIds = ids['responsive'];

    defaultIds.forEach(element => {
        let elementRef = document.getElementById(element);
        if (elementRef) {
            elementRef.classList.add("dark-blueBg");
            elementRef.style.pointerEvents = "none";
        }
    });

    responsiveIds.forEach(element => {
        let elementRef = document.getElementById(element);
        if (elementRef) {
            elementRef.classList.add("dark-blueBg");
            elementRef.style.pointerEvents = "none";
        }
    });
}

function dropDown() {
    let content = document.getElementById("dropdown");
    content.innerHTML = "";
    if (content.classList.contains("d-none")) {
        content.classList.remove("d-none");
    }
    content.innerHTML += `
        <div class="dropdown-container">
            <a href="help.html">Help</a>
            <a href="legalNotice.html">Legal Notice</a>     
            <a href="privacyPolicy.html">Privacy Policy</a>     
            <a id="logOut" onclick="logOut()"href="login.html">Log out</a>     
        </div>
    `;

    document.addEventListener('mouseup', function (e) {
        if (!content.contains(e.target)) {
            content.classList.add('d-none');
        }
    });
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

async function logOut() {
    try {
        loggedInUsers.length = 0;
        await setItem('loggedInUsers', JSON.stringify(loggedInUsers));
        window.location.href = "../login.html";
    } catch (error) {
        console.error("Logout failed:", error);
    }
}

function currentUser() {
    let iconName = document.getElementById('navHeader');
    if (loggedInUsers && loggedInUsers.length > 0 && loggedInUsers[0]) {
        iconName.innerHTML = loggedInUsers[0].charAt(0).toUpperCase();
    } else {
        console.error("No logged in user found");
    }
}

function contentToBoard() {
    window.location.href = '../board.html';
}

async function loadUsers() {
    loggedInUsers = ['defaultUser'];
}

async function loadOnlineStatus() {
    // Load online status here
}