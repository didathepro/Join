const tasks = {
    "tasksToDo": undefined,
    "tasksInProgress":
        [
            {
                "title": 'Contact Form & Imprint',
                "description": 'Create a contact form and imprint page...',
                "category": 'User Story',
                "subtasks": [{ one: true }, { two: false }],
                "assigned": ['AS', 'DE', 'EF'],
                "priority": 'Urgent'
            },
        ],
    "tasksAwaitFeedback":
        [
            {
                "title": 'HTML Base Template Creation',
                "description": 'Create reusable HTML base templates...',
                "category": 'Technical Task',
                "subtasks": undefined,
                "assigned": ['DE', 'BZ', 'AS'],
                "priority": 'Low'
            },
            {
                "title": 'Daily Kochwelt Recipe',
                "description": 'Implement daily recipe and portion calculator...',
                "category": 'User Story',
                "subtasks": undefined,
                "assigned": ['EF', 'AS', 'TW'],
                "priority": 'Medium'
            },
        ],
    "tasksDone":
        [
            {
                "title": 'CSS Architecture Planning',
                "description": 'Define CSS naming conventions and structure...',
                "category": 'Technical Task',
                "subtasks": [{ one: true }, { two: true }],
                "assigned": ['SM', 'BZ'],
                "priority": 'Urgent'
            },
        ],
};

const taskTypesKeys = Object.keys(tasks);

function boardInit() {
    iterateTaskTypes();
}

function iterateTaskTypes() {
    for (let i = 0; i < taskTypesKeys.length; i++) {
        if (tasks[taskTypesKeys[i]] == undefined) {
            console.log(`No tasks in "${taskTypesKeys[i]}"`);
            document.getElementById(`${taskTypesKeys[i]}`).innerHTML = generateNoTasksHtml();
        }
        else {
            iterateTasks(tasks[taskTypesKeys[i]], i);
        }

    }
}

function iterateTasks(taskType, i) {
    const taskTypeKeys = Object.keys(taskType);
    console.log(`Recieved for task iteration of "${taskTypesKeys[i]}":`, taskType);
    let boardTaskType = document.getElementById(taskTypesKeys[i]);
    for (let j = 0; j < taskTypeKeys.length; j++) {
        boardTaskType.innerHTML += generateTaskHtml(taskType, i, j);
        setTaskColor(i, j);
    };
}

function generateTaskHtml(taskType, i, j) {
    const taskTypeString = taskTypesKeys[i];
    return /*html*/`
        <div class="task d-flex justify-content-center flex-column">
            <div class="taskCategory d-flex align-items-center" id="${taskTypeString}Category${j}">${taskType[j].category}</div>
            <p class="taskTitle">${taskType[j].title}</p>
            <p class="taskDescription">${taskType[j].description}</p>
            <div>
                <p>${taskType[j].assigned}</p>
                <img src="img/icon/priority${taskType[j].priority}.svg" alt="Priority">
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

function setTaskColor(i, j) {
    const taskTypeString = taskTypesKeys[i];
    let taskbg = document.getElementById(`${taskTypeString}Category${j}`);
    if (tasks[taskTypeString][j].category == 'User Story') {
        taskbg.style.background = '#0038FF';
    }
    else {
        taskbg.style.background = '#1FD7C1';
    };
}