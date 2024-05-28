async function init() {
    await includeHTML();
    addBg();
    await loadUsers();
    await loadOnlineStatus();
    currentUser();
    greet();
    showSummaryName();
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

function dropDown() {

    let content = document.getElementById("dropdown");
    content.innerHTML = "";
    if (content.classList.contains("d-none")) {
        content.classList.remove("d-none");
    }
    content.innerHTML += `
        <div class="dropdown-container">
            <a href="./help.html">Help</a>
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


async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html"); // "includes/header.html"
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
  }
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
    let iconName = document.getElementById('navHeader');
    iconName.innerHTML = loggedInUsers[0].charAt(0).toUpperCase()
}
function contentToBoard() {
    window.location.href = '../board.html'
}