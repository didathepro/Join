const tasks = {
    "tasksToDo": undefined,
    "tasksInProgress":
        [
            {
                "title": 'Contact Form & Imprint',
                "description": 'Create a contact form and imprint page...',
                "category": 'User Story',
                "subtasks": [
                    { 
                        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                        done: true    
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                        done: false
                    }
                ],
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
                "subtasks": [
                    { 
                        title: 'Establish CSS Methodology',
                        done: true    
                    },
                    {
                        title: 'Setup Base Styles',
                        done: true
                    }
                ],
                "assigned": ['SM', 'BZ'],
                "priority": 'Urgent'
            },
        ],
};

const taskTypesKeys = Object.keys(tasks);
let currentlyDraggedCategory;
let currentlyDraggedId;

function boardInit() {
    iterateTaskTypes();
}

function iterateTaskTypes() {
    for (let i = 0; i < taskTypesKeys.length; i++) {
        if (tasks[taskTypesKeys[i]] == undefined) {
            document.getElementById(`${taskTypesKeys[i]}`).innerHTML = generateNoTasksHtml();
        }
        else {
            iterateTasks(tasks[taskTypesKeys[i]], i);
        }

    }
}

function iterateTasks(taskType, i) {
    const taskTypeKeys = Object.keys(taskType);
    let boardTaskType = document.getElementById(taskTypesKeys[i]);
    for (let j = 0; j < taskTypeKeys.length; j++) {
        boardTaskType.innerHTML += generateTaskHtml(taskType, i, j);
        setTaskColor(i, j);
        insertTaskAssigned(i, j);
        insertTaskProgress(i, j);
    };
}

function generateTaskHtml(taskType, i, j) {
    const taskTypeString = taskTypesKeys[i];
    return /*html*/`
        <div class="task d-flex justify-content-center flex-column mb-3" draggable="true" ondragstart="startDragging(${i}, ${j})">
            <div class="taskCategory d-flex align-items-center" id="${taskTypeString}Category${j}">${taskType[j].category}</div>
            <p class="taskTitle">${taskType[j].title}</p>
            <p class="taskDescription">${taskType[j].description}</p>
            <div class="d-flex gap-3 align-items-baseline">
                    <div id="${taskTypeString}Progress${j}" style="width: 128px;"></div>
                    <p class="m-0 progressText" id="${taskTypeString}ProgressText${j}"></p>
            </div>
            <div class="d-flex justify-content-between">
                <div id="${taskTypeString}Assigned${j}" class="d-flex"></div>
                <div class="iconBox32">
                    <img src="img/icon/priority${taskType[j].priority}.svg" alt="Priority">
                </div>
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
    const taskCategoryBg = document.getElementById(`${taskTypeString}Category${j}`);
    if (tasks[taskTypeString][j].category == 'User Story') {
        taskCategoryBg.style.background = '#0038FF';
    }
    else {
        taskCategoryBg.style.background = '#1FD7C1';
    };
}

function insertTaskAssigned(i, j) {
    const taskTypeString = taskTypesKeys[i];
    const taskAssigned = document.getElementById(`${taskTypeString}Assigned${j}`);
    for (let k = 0; k < tasks[taskTypeString][j].assigned.length; k++) {
        taskAssigned.innerHTML += generateTaskAssignedHtml(i, j, k);
    };
}

function generateTaskAssignedHtml(i, j, k) {
    const taskTypeString = taskTypesKeys[i];
    return /*html*/`
        <div class="taskAssigned d-flex justify-content-center align-items-center" id="${taskTypeString}Assigned${j}_${k}">
            ${tasks[taskTypeString][j].assigned[k]}
        </div>
    `
}

function insertTaskProgress(i, j) {
    const taskTypeString = taskTypesKeys[i];
    const taskProgress = document.getElementById(`${taskTypeString}Progress${j}`);
    let subtasksDone = 0;
    if (tasks[taskTypeString][j].subtasks) {
        taskProgress.classList.add('progress');
        for (let k = 0; k < tasks[taskTypeString][j].subtasks.length; k++) {
            if (tasks[taskTypeString][j].subtasks[k].done == true) {subtasksDone++}
        }
        progressPercent = (subtasksDone / tasks[taskTypeString][j].subtasks.length) * 100;   
        taskProgress.innerHTML = /*html*/`
                        <div class="progress-bar" style="width: ${progressPercent}%" role="progressbar" valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100"></div>
        `
        document.getElementById(`${taskTypeString}ProgressText${j}`).innerHTML = `${subtasksDone}/${tasks[taskTypeString][j].subtasks.length} Subtasks`
        };
}

function startDragging(i,  j) {
    currentlyDraggedCategory = i;
    currentlyDraggedId = j;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    const taskTypeString = taskTypesKeys[currentlyDraggedCategory];
    const removedTask = tasks[taskTypeString].splice(currentlyDraggedId, 1);
    console.log(removedTask);
    tasks[taskTypeString][category].push(removedTask);
}