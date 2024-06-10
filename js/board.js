const subtasks = ['Contact Form', 'Write Legal Imprint'];

const taskTypesKeys = Object.keys(tasks);
let currentlyDraggedCategory;
let currentlyDraggedId;
let isDragging = false;
let selectedType = 'tasksToDo';
let selectedTaskTypeIndex;
let selectedTaskIndex;
let editedTaskIndex;
let isEditing = false; 


async function boardInit() {
    await loadTasks();
    clearBoard();
    iterateTaskTypes();
    insertContacts();
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
        } else {
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
    selectedType = type;
    disableScrolling();
    document.getElementById('closeIcon').classList.remove('d-none');
}

function hideAddTaskFloating() {
    document.getElementById('addTaskFloating').classList.add('d-none');
    document.getElementById('addTaskFloatingBg').classList.add('d-none');
    enableScrolling();
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
    if (!tasks || !taskTypesKeys || i >= taskTypesKeys.length || !tasks[taskTypesKeys[i]]) {
        console.error('Invalid task type or index');
        return;
    }

    const taskType = tasks[taskTypesKeys[i]];
    if (j >= taskType.length) {
        console.error('Invalid task index');
        return;
    }

    selectedTaskTypeIndex = i;
    selectedTaskIndex = j;

    document.getElementById('taskOverlay').innerHTML = generateTaskOverlayHtml(taskType, i, j);
    document.getElementById('taskOverlay').classList.remove('d-none');

    setTaskOverlayColor(i, j);
    insertTaskOverlayAssigned(i, j);
    insertOverlaySubtasks(taskType, i, j);

    disableScrolling();
}

function hideTaskOverlay() {
    document.getElementById('taskOverlay').classList.add('d-none');
    enableScrolling();
}

async function deleteTask() {
    if (typeof selectedTaskTypeIndex !== 'number' || typeof selectedTaskIndex !== 'number') {
        console.error('Invalid task selection');
        return;
    }

    const taskTypeKey = taskTypesKeys[selectedTaskTypeIndex];
    const taskType = tasks[taskTypeKey];

    if (!taskType || selectedTaskIndex >= taskType.length) {
        console.error('Invalid task index');
        return;
    }

    taskType.splice(selectedTaskIndex, 1);
    await setItem('tasks', tasks);
    boardInit();
    hideTaskOverlay();
}
function editTask() {
    hideTaskOverlay();
    
    // Überprüfe, ob die ausgewählten Task-Indizes gültig sind
    if (typeof selectedTaskTypeIndex !== 'number' || typeof selectedTaskIndex !== 'number') {
        console.error('Ungültige Auswahl des Tasks');
        return;
    }

    // Hole den Schlüssel des ausgewählten Task-Typs
    const taskTypeKey = taskTypesKeys[selectedTaskTypeIndex];
    // Hole das Array der ausgewählten Task-Typen
    const taskType = tasks[taskTypeKey];

    // Überprüfe, ob das Task-Array vorhanden ist und der ausgewählte Task-Index innerhalb des Arrays liegt
    if (!taskType || selectedTaskIndex >= taskType.length) {
        console.error('Ungültiger Task-Index');
        return;
    }

    // Hole den ausgewählten Task
    const selectedTask = taskType[selectedTaskIndex];

    // Setze den ausgewählten Typ
    selectedType = taskTypeKey;

    // Zeige das Formular zum Bearbeiten des Tasks an
    showAddTaskFloating(selectedType);

    // Befülle die bearbeitbaren Felder mit den Daten des ausgewählten Tasks
    document.getElementById('newTaskTitle').value = selectedTask.title;
    document.getElementById('newTaskDescription').value = selectedTask.description;
    document.getElementById('newTaskCategory').value = selectedTask.category;
    document.getElementById('newTaskDate').value = selectedTask.date;
    selectActivePriority(selectedTask.priority);

    // Befülle die ausgewählten Kontaktanzeigen
    selectedTask.assigned.forEach(name => {
        const checkbox = document.getElementById(name);
        if (checkbox) {
            checkbox.checked = true;
        }
    });

    // Befülle die hinzugefügten Unteraufgaben (falls vorhanden)
    if (selectedTask.subtasks && selectedTask.subtasks.length > 0) {
        selectedSubtask = selectedTask.subtasks.length;
        selectedTask.subtasks.forEach(subtask => {
            subtasks.push(subtask.title);
            addSubTask();
        });
    }

    // Ändere den Text des Buttons von "Create" zu "Save"
    const saveButton = document.getElementById('createTaskButton');
    saveButton.innerText = 'Save Task';
    saveButton.onclick = function() {
        saveEditedTask(taskTypeKey, selectedTaskIndex);
    };

    // Füge einen Cancel-Button hinzu
    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.onclick = function() {
        hideAddTaskFloating();
    };
    saveButton.parentElement.appendChild(cancelButton);
}

async function saveEditedTask() {
    const task = tasks[taskTypesKeys[selectedTaskTypeIndex]][selectedTaskIndex];

    task.title = document.getElementById('newTaskTitle').value;
    task.description = document.getElementById('newTaskDescription').value;
    task.category = document.getElementById('newTaskCategory').value;
    task.date = document.getElementById('newTaskDate').value;
    task.priority = selectedPriority;

    const assignedCheckboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]');
    task.assigned = Array.from(assignedCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    task.subtasks = getAddedSubtasks();

    await setItem('tasks', tasks);
    boardInit();
    hideAddTaskFloating();
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

function disableScrolling() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

function enableScrolling() {
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
}