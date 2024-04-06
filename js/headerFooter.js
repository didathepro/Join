async function init(){
    await includeHTML();
    addBg();
}

function addBg() {
    let currentPage = window.location.pathname;
    
    // Define the mapping of page names to IDs
    let maps = {
        '/index.html': {
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
function dropDown(){

    let content = document.getElementById("dropdown");

    if(content.classList.contains("d-none")){
        content.classList.remove("d-none");
    }

    content.innerHTML +=`
        <div class="dropdown-container">
            <a href="../legalNotice.html">Legal Notice</a>     
            <a href="../privacyPolicy.html">Privacy Policy</a>     
            <a href="#">Log out</a>     
        </div>
    `;

    //Close dropown when clicked outside of dropdown menu
    document.addEventListener('mouseup', function(e) {
    if (!content.contains(e.target)) {
    content.classList.add('d-none');
    }
});
;}