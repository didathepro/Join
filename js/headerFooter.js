async function init(){
    await includeHTML();
    addBg();
}

function addBg(){
    let currentPage = window.location.pathname;
    let maps = {
        '/index.html' : ['summary'],
        '/addTask.html' : ['tasks'],
        '/board.html' : ['board'],
        '/contacts.html' : ['contacts']
    };

    let ids = maps[currentPage];
    ids.forEach(element => {
        let elementRef = document.getElementById(element);
        elementRef.classList.add("dark-blueBg");
        elementRef.style.pointerEvents = "none"; // Enable pointer events for all elements
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
            <a href="#">Legal Notice</a>     
            <a href="#">Privacy Policy</a>     
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

//Edit