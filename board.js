let tasks = {
    "tasksToDo": [],
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
                "assigned": ['Anja Schulz', 'David Eisenberg', 'Eva Fischer'],
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
                "assigned": ['David Eisenberg', 'Benedikt Ziegler', 'Anja Schulz'],
                "priority": 'Low'
            },
            {
                "title": 'Daily Kochwelt Recipe',
                "description": 'Implement daily recipe and portion calculator...',
                "category": 'User Story',
                "subtasks": undefined,
                "assigned": ['Eva Fischer', 'Anja Schulz', 'Tatjana Wolf'],
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
                "assigned": ['Sofia Müller', 'Benedikt Ziegler'],
                "priority": 'Urgent',
                "date": '02/09/2023'
            },
        ],
};

const subtasks = ['Contact Form', 'Write Legal Imprint'];

const taskTypesKeys = Object.keys(tasks);
let currentlyDraggedCategory;
let currentlyDraggedId;
let isDragging = false;
let selectedType = 'tasksToDo';

async function boardInit() {
    await loadTasks();
    clearBoard();
    iterateTaskTypes();
    insertContacts();
    // updateDraggableAttribute();
}

function clearBoard() {
    for (let i = 0; i < taskTypesKeys.length; i++) {
        document.getElementById(taskTypesKeys[i]).innerHTML = '';
    }
}

function iterateTaskTypes() {
    for (let i = 0; i < taskTypesKeys.length; i++) {
        if (tasks[taskTypesKeys[i]].length <= 0) {
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
        <div class="task d-flex justify-content-center flex-column" draggable="true" ondragstart="startDragging(${i}, ${j})" onclick="showTaskOverlay(${taskTypeString}, ${i}, ${j})">
            <div class="taskCategory d-flex align-items-center" id="${taskTypeString}Category${j}">${taskType[j].category}</div>
            <p class="taskTitle text-break">${taskType[j].title}</p>
            <p class="taskDescription text-break">${taskType[j].description}</p>
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
    if (taskCategoryBg && tasks[taskTypeString] && tasks[taskTypeString][j]) {
        const taskPriority = tasks[taskTypeString][j].priority;
        if (taskPriority !== undefined) {
            if (taskPriority === 'Urgent') {
                taskCategoryBg.style.background = '#1CD7C1';
            } else if (taskPriority === 'Medium') {
                taskCategoryBg.style.background = '#0038FF';
            } else {
                const taskCategory = tasks[taskTypeString][j].category;
                if (taskCategory === 'User Story') {
                    taskCategoryBg.style.background = '#0038FF';
                } else {
                    taskCategoryBg.style.background = '#1CD7C1';
                }
            }
        } else {
            taskCategoryBg.style.background = '#CCCCCC';
        }
    }
}

function insertTaskAssigned(i, j) {
    const taskTypeString = taskTypesKeys[i];
    const taskAssigned = document.getElementById(`${taskTypeString}Assigned${j}`);
    if (tasks[taskTypeString][j].assigned) {
        tasks[taskTypeString][j].assigned.forEach(function (assignee, k) {
            taskAssigned.innerHTML += /*html*/`
                <div class="taskAssigned d-flex justify-content-center align-items-center">
                    ${getInitials(tasks[taskTypeString][j].assigned[k])}
                </div>
            `
        }
        );
    };
}

function insertTaskProgress(i, j) {
    const taskTypeString = taskTypesKeys[i];
    const taskProgress = document.getElementById(`${taskTypeString}Progress${j}`);
    if (taskProgress) {
        const task = tasks[taskTypeString][j];
        if (task && task.subtasks) {
            let subtasksDone = 0;
            taskProgress.classList.add('progress');
            for (let k = 0; k < task.subtasks.length; k++) {
                if (task.subtasks[k].done === true) { subtasksDone++; }
            }
            const progressPercent = (subtasksDone / task.subtasks.length) * 100;
            taskProgress.innerHTML = `
                <div class="progress-bar" style="width: ${progressPercent}%" role="progressbar" valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100"></div>
            `;
            const progressTextElement = document.getElementById(`${taskTypeString}ProgressText${j}`);
            if (progressTextElement) {
                progressTextElement.innerHTML = `${subtasksDone}/${task.subtasks.length} Subtasks`;
            }
        }
    }
}

function startDragging(i, j) {
    currentlyDraggedCategory = i;
    currentlyDraggedId = j;
}

function allowDrop(event) { event.preventDefault(); }

async function changeCategory(category) {
    const taskTypeString = taskTypesKeys[currentlyDraggedCategory];
    let removedTask = tasks[taskTypeString].splice(currentlyDraggedId, 1)[0];
    tasks[category].push(removedTask);
    await setItem('tasks', tasks);
    boardInit();
}

function showAddTaskFloating(type) {
    document.getElementById('addTaskFloating').classList.remove('d-none');
    document.getElementById('addTaskFloatingBg').classList.remove('d-none');
    document.getElementById('closeIcon').classList.remove('d-none');
    selectedType = type;
}

function hideAddTaskFloating() {
    document.getElementById('addTaskFloating').classList.add('d-none');
    document.getElementById('addTaskFloatingBg').classList.add('d-none');
    document.getElementById('closeIcon').classList.add('d-none');
}

function search() {
    let search = document.getElementById('searchInput').value.trim().toLowerCase();
    clearBoard();
    if (search === '') { iterateTaskTypes(); }
    else {
        taskTypesKeys.forEach(function (taskTypeKey) {
            tasks[taskTypeKey].forEach(function (task, index) {
                if (task.title.toLowerCase().includes(search) || (task.description && task.description.toLowerCase().includes(search))) {
                    document.getElementById(taskTypeKey).innerHTML += generateTaskHtml(tasks[taskTypeKey], taskTypeKey === 'tasksToDo' ? 0 : 1, index);
                    setTaskColor(taskTypeKey === 'tasksToDo' ? 0 : 1, index);
                    insertTaskAssigned(taskTypeKey === 'tasksToDo' ? 0 : 1, index);
                    insertTaskProgress(taskTypeKey === 'tasksToDo' ? 0 : 1, index);
                }
            });
        });
    }
}

function showTaskOverlay(taskTypeString, i, j) {
        const taskType = tasks[taskTypesKeys[i]];
        document.getElementById('taskOverlay').innerHTML = generateTaskOverlayHtml(taskType, i, j);
        document.getElementById('taskOverlay').classList.remove('d-none');
        setTaskOverlayColor(i, j);
        insertTaskOverlayAssigned(i, j);
        insertOverlaySubtasks(taskType, i, j);
}

function hideTaskOverlay() {
    document.getElementById('taskOverlay').classList.add('d-none');
}

function generateTaskOverlayHtml(taskType, i, j) {
    return /*html*/`
        <div class="taskOverlay d-flex justify-content-center flex-column mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="taskOverlayCategory" id="taskOverlayCategory">${taskType[j].category}</div>
                <img src="/img/icon/cross.svg" alt="Cross" onclick="hideTaskOverlay()">
            </div>    
            <p class="taskOverlayTitle text-break">${taskType[j].title}</p>
            <p class="taskOverlayDescription text-break">${taskType[j].description}</p>
            <div class="d-flex gap-3">
                <p class="taskOverlayTextGray">Due date:</p>
                <p class="taskOverlayDate">${taskType[j].date}</p>
            </div>
            <div class="d-flex gap-4">
                <p class="taskOverlayTextGray">Priority:</p>
                <div class="d-flex">
                    <p>${taskType[j].priority}</p>
                    <div class="iconBox32">
                        <img src="img/icon/priority${taskType[j].priority}.svg" alt="Priority">
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column">
                <p class="taskOverlayTextGray">Assigned to:</p>
                <!-- <div id="customDropdown" class="customDropdown">
                            <button onclick="toggleDropdown()" class="selectedContactsBtn">Select contacts to assign<img  src="./assets/img/arrow_drop_down.png"></button>
                            <div id="dropdownMenu" class="dropdownMenu">
                            </div>
                        </div> -->
            </div>
            <div id="selectedContacts" class="selectedContacts"></div>
            <div class="d-flex justify-content-between">
                <div id="taskOverlayAssigned" class="d-flex"></div>
            </div>
            <div>
                <p class="taskOverlayTextGray d-none mb-2" id="taskOverlaySubtasksTitle">Subtasks</p>
                <div id="taskOverlaySubtasks"></div>
            </div>
            <div class="overlaytasksBtns">
            <button class="overlayDelete">Delete  <img class="overlayDeleteImg" src="./assets/img/delete.png"></button>
            <img src="./assets/img/Vector 3.png">
            <button class="overlayEdit">Edit  <img class="overlayEditImg" src="./assets/img/edit.png"></button>
            </div>
        </div>
    `
}

function setTaskOverlayColor(i, j) {
    const taskTypeString = taskTypesKeys[i];
    const taskCategoryBg = document.getElementById(`taskOverlayCategory`);
    if (taskCategoryBg && tasks[taskTypeString] && tasks[taskTypeString][j]) {
        const taskPriority = tasks[taskTypeString][j].priority;
        if (taskPriority !== undefined) {
            if (taskPriority === 'Urgent') {
                taskCategoryBg.style.background = '#1CD7C1';
            } else if (taskPriority === 'Medium') {
                taskCategoryBg.style.background = '#0038FF';
            } else {
                const taskCategory = tasks[taskTypeString][j].category;
                if (taskCategory === 'User Story') {
                    taskCategoryBg.style.background = '#0038FF';
                } else {
                    taskCategoryBg.style.background = '#1CD7C1';
                }
            }
        } 
        else {
            taskCategoryBg.style.background = '#CCCCCC';
        }
    }
}

function insertTaskOverlayAssigned(i, j) {
    const taskTypeString = taskTypesKeys[i];
    const taskAssigned = document.getElementById(`taskOverlayAssigned`);
    if (tasks[taskTypeString][j].assigned) {
        tasks[taskTypeString][j].assigned.forEach(function (assignee, k) {
            taskAssigned.innerHTML += /*html*/`
                <div class="taskAssigned d-flex justify-content-center align-items-center">
                    ${getInitials(tasks[taskTypeString][j].assigned[k])}
                </div>
            `
        }
        );
    }
}

function insertOverlaySubtasks(taskType, i, j) {
    if (taskType[j].subtasks.length >= 1) {
        for (let k = 0; k < taskType[j].subtasks.length; k++) {
            if (taskType[j].subtasks[k].done == true) {
                generateOverlaySubtasksHtmlDone(taskType, i, j, k);
            }
            else {
                generateOverlaySubtasksHtmlNotDone(taskType, i, j, k);
            }
        }
        document.getElementById('taskOverlaySubtasksTitle').classList.remove('d-none');
    }
    else {
        document.getElementById('taskOverlaySubtasksTitle').classList.add('d-none');

    }
}

function generateOverlaySubtasksHtmlDone(taskType, i, j, k) {
    document.getElementById('taskOverlaySubtasks').innerHTML += /*html*/`
    <div class="d-flex align-items-center gap-2 mb-1">
        <img src="/img/icon/checkbox-checked.svg" alt="Clear checkbox">
        <p>${taskType[j].subtasks[k].title}</p>
    </div>
        `
}

function generateOverlaySubtasksHtmlNotDone(taskType, i, j, k) {
    document.getElementById('taskOverlaySubtasks').innerHTML += /*html*/`
    <div class="d-flex align-items-center gap-2 mb-1">
        <img src="/img/icon/checkbox.svg" alt="Clear checkbox">
        <p>${taskType[j].subtasks[k].title}</p>
    </div>
        `
}