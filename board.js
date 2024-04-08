let tasksToDo;
let tasksInProgress = [
    {
        title: 'Conntact Form & Imprint',
        description: 'Create a conntact form and imprint page...',
        category: 'User Story',
        subtasks: [
            {one: true},
            {two: false}
        ],
        assigned: ['AS', 'DE', 'EF'],
        priority: 'Urgent'
    }
]

let tasksAwaitFeedback;
let tasksDone;

const taskColors = {
    userStory: '#0038FF',
    technicalTask: '#1FD7C1'
}

// const boardInProgress = document.getElementById('boardInProgress');

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

function boardInit() {
    loadBoardToDo();
    loadBoardInProgress();
    loadBoardAwaitFeedback();
    loadBoardDone();
}

function loadBoardToDo() {
    const boardToDo = document.getElementById('boardToDo');
    boardToDo.innerHTML = '';
    if (tasksToDo) {
        boardToDo.innerHTML += `${generateTasksToDoHtml()}`
    }
    else {
        boardToDo.innerHTML += `${generateNoTasksHtml()}`
    };
}

function loadBoardInProgress() {
    const boardInProgress = document.getElementById('boardInProgress');
    boardInProgress.innerHTML = '';
    if (tasksInProgress) {
        generateTasksInProgress();
    }
    else {
        boardInProgress.innerHTML += generateNoTasksHtml();
    };
}

function generateTasksInProgress() {
    const boardInProgress = document.getElementById('boardInProgress');
    for (let i = 0; i < tasksInProgress.length; i++) {
        boardInProgress.innerHTML += generateTasksInProgressHtml(i);
    }
}

function generateTasksInProgressHtml(i) {
    return /*html*/`
        <div class="task d-flex justify-content-center flex-column">
            <div class="taskCategory">${tasksInProgress[i].category}</div>
            <p>${tasksInProgress[i].title}</p>
            <p>${tasksInProgress[i].description}</p>
            <div>
                <p>${tasksInProgress[i].assigned}</p>
                <img src="img/icon/priority${tasksInProgress[i].priority}.svg" alt="Priority">
            </div>
        </div>
    `
}

function loadBoardAwaitFeedback() {
    const boardAwaitFeedback = document.getElementById('boardAwaitFeedback');
    boardAwaitFeedback.innerHTML = '';
    if (tasksAwaitFeedback) {}
    else {
        boardAwaitFeedback.innerHTML += generateNoTasksHtml();
    };
}

function loadBoardDone() {
    const boardDone = document.getElementById('boardDone');
    boardDone.innerHTML = '';
    if (tasksDone) {}
    else {
        boardDone.innerHTML += generateNoTasksHtml();
    };
}

function generateNoTasksHtml() {
    return /*html*/`
        <div class="emptyTask d-flex justify-content-center align-items-center">
            <p>No tasks To do</p>
        </div>
    `
}