// const tasks = {
//     "tasksToDo": undefined,
//     "tasksInProgress": {
//         "title": 'Contact Form & Imprint',
//         "description": 'Create a contact form and imprint page...',
//         "category": 'User Story',
//         "subtasks": [
//             { one: true },
//             { two: false }
//         ],
//         "assigned": ['AS', 'DE', 'EF'],
//         "priority": 'Urgent'
//         },
//     "tasksAwaitFeedback": undefined,
//     "tasksDone": undefined
// };

let tasksToDo;
let tasksInProgress = [
    {
        "title": 'Contact Form & Imprint',
        "description": 'Create a contact form and imprint page...',
        "category": 'User Story',
        "subtasks": [
            { one: true },
            { two: false }
        ],
        "assigned": ['AS', 'DE', 'EF'],
        "priority": 'Urgent'
    },
];
let tasksAwaitFeedback;
let tasksDone;

function boardInit() {
    // iterateTaskTypes();
    loadBoardToDo();
    loadBoardInProgress();
    loadBoardAwaitFeedback();
    loadBoardDone();
}

// function iterateTaskTypes() {
//     for (let i = 0; i < tasks.length; i++) {
//         iterateTasks(tasks.objects[i]);
//     }
// }

function loadBoardToDo() {
    if (tasksToDo) {
        iterateTasks(tasksToDo);
    }
    else {
        document.getElementById('tasksToDo').innerHTML += generateNoTasksHtml();
    };
}

function loadBoardInProgress() {
    if (tasksInProgress) {
        iterateTasks(tasksInProgress);
    }
    else {
        document.getElementById('tasksInProgress').innerHTML += generateNoTasksHtml();
    };
}

function loadBoardAwaitFeedback() {
    if (tasksAwaitFeedback) {
        iterateTasks(tasksAwaitFeedback);
    }
    else {
        document.getElementById('tasksAwaitFeedback').innerHTML += generateNoTasksHtml();
    };
}

function loadBoardDone() {
    if (tasksDone) {
        iterateTasks(tasksDone);
    }
    else {
        document.getElementById('tasksDone').innerHTML += generateNoTasksHtml();
    };
}

// function iterateTasks(taskType) {
// const boardTaskType = document.getElementById(taskType);
//     if (taskType) {
//         for (let i = 0; i < taskType.length; i++) {
//             boardTaskType.innerHtml += generateTaskHtml(taskType, i);
//         };
//     }
//     else {
//         generateNoTasksHtml();
//     };
// }

function iterateTasks(taskType) {
    // const taskTypeString = Object.keys({taskType})[0];
    // let boardTaskType = document.getElementById(`${taskTypeString}`);
    for (let i = 0; i < taskType.length; i++) {
        // boardTaskType.innerHtml += generateTaskHtml(taskType, i);
        document.getElementById('tasksInProgress').innerHTML += generateTaskHtml(taskType, i);
    };
}

function generateTaskHtml(taskType, i) {
    return /*html*/`
        <div class="task d-flex justify-content-center flex-column">
            <div class="taskCategory d-flex align-items-center" id="${taskType[i]}">${taskType[i].category}</div>
            <p class="taskTitle">${taskType[i].title}</p>
            <p class="taskDescription">${taskType[i].description}</p>
            <div>
                <p>${taskType[i].assigned}</p>
                <img src="img/icon/priority${taskType[i].priority}.svg" alt="Priority">
            </div>
        </div>
    `
}

function generateNoTasksHtml() {
    return /*html*/`
        <div class="emptyTask d-flex justify-content-center align-items-center">
            <p>No tasks To do</p>
        </div>
    `
}

function setTaskColor(task) {
    let taskbg = document.getElementById(`${task}`);
    if (task.category == 'User Story') {
        taskbg.style.background = '#0038FF';
    }
    else {
        taskbg.style.background = '#1FD7C1';
    };
}