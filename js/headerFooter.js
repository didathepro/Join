async function init() {
    await includeHTML();
    addBg();
    await loadUsers();
    await loadOnlineStatus()
    currentUser()
    greet()
}

function addBg() {
    let currentPage = window.location.pathname;

    // Define the mapping of page names to IDs
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


    // Get the appropriate IDs based on the current page
    let ids = maps[currentPage] || { 'default': [], 'responsive': [] };
    let defaultIds = ids['default'];
    let responsiveIds = ids['responsive'];

    // Add the class to elements in the default container
    defaultIds.forEach(element => {
        let elementRef = document.getElementById(element);
        if (elementRef) {
            elementRef.classList.add("dark-blueBg");
            elementRef.style.pointerEvents = "none"; // Enable pointer events for all elements
        }
    });

    // Add the class to elements in the responsive container
    responsiveIds.forEach(element => {
        let elementRef = document.getElementById(element);
        if (elementRef) {
            elementRef.classList.add("dark-blueBg");
            elementRef.style.pointerEvents = "none"; // Enable pointer events for all elements
        }
    });
}

// Dropdown Menu On click
function dropDown() {

    let content = document.getElementById("dropdown");

    if (content.classList.contains("d-none")) {
        content.classList.remove("d-none");
    }

    content.innerHTML += `
        <div class="dropdown-container">
            <a href="../legalNotice.html">Legal Notice</a>     
            <a href="../privacyPolicy.html">Privacy Policy</a>     
            <a id="logOut" onclick="logOut()"href="../login.html">Log out</a>     
        </div>
    `;

    //Close dropown when clicked outside of dropdown menu
    document.addEventListener('mouseup', function (e) {
        if (!content.contains(e.target)) {
            content.classList.add('d-none');
        }
    });
    ;
}

async function logOut() {
    if (confirm("Are you sure you want to log out?")) {
        try {
            loggedInUsers.length = 0;
            await setItem('loggedInUsers', JSON.stringify(loggedInUsers));
            // Weiterleitung zur Login-Seite
            window.location.href = "../login.html";
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    }
}

function currentUser() {
    let name = document.getElementById('nameSummary');
    let iconName = document.getElementById('navHeader');
    name.innerHTML = loggedInUsers[0];
    iconName.innerHTML = loggedInUsers[0].charAt(0).toUpperCase()
}

function greet() {
    let greeting = defineDayTime();

    let message = document.getElementById('greetingTime');
    message.innerHTML = greeting;

}

function defineDayTime() {
    let today = new Date();
    let time = today.getHours();
    let greeting;

    if (time < 6) {
        greeting = 'Good night,&nbsp;';
    } else if (time < 12) {
        greeting = 'Good morning,&nbsp;';
    } else if (time < 18) {
        greeting = 'Good afternoon,&nbsp;';
    } else if (time < 24) {
        greeting = 'Good evening,&nbsp;';
    };
    return greeting;
}

function contentToBoard() {
    window.location.href = '../board.html'
}
