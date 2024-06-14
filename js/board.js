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


/** The function `boardInit` initializes a board by loading tasks, clearing the board, iterating through task types, and inserting contacts. */
async function boardInit() {
    await loadTasks();
    clearBoard();
    iterateTaskTypes();
    insertContacts();
}


/** The `clearBoard` function clears the content of HTML elements identified by keys in the `taskTypesKeys` array. */
function clearBoard() {
    for (let i = 0; i < taskTypesKeys.length; i++) {
        document.getElementById(taskTypesKeys[i]).innerHTML = '';
    }
}


/** The function `iterateTaskTypes` iterates through task types and generates HTML based on the tasks associated with each type. */
function iterateTaskTypes() {
    for (let i = 0; i < taskTypesKeys.length; i++) {
        if (tasks[taskTypesKeys[i]].length <= 0) {
            document.getElementById(`${taskTypesKeys[i]}`).innerHTML = generateNoTasksHtml();
        } else {
            iterateTasks(tasks[taskTypesKeys[i]], i);
        }

    }
}


/** The function `iterateTasks` iterates over tasks from the given type and generates HTML elements for each task. */
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


/** The function `setTaskColor` dynamically sets the background color of a task category element based on its priority and category. */
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


/** The function `insertTaskAssigned` populates the assigned task section with initials of assignees for a specific task type and index. */
function insertTaskAssigned(i, j) {
    const taskTypeString = taskTypesKeys[i];
    const taskAssigned = document.getElementById(`${taskTypeString}Assigned${j}`);
    if (taskAssigned && tasks[taskTypeString][j] && tasks[taskTypeString][j].assigned) {
        tasks[taskTypeString][j].assigned.forEach(function (assignee, k) {
            taskAssigned.innerHTML += /*html*/`
                <div class="taskAssigned d-flex justify-content-center align-items-center">
                    ${getInitials(assignee)}
                </div>
            `;
        });
    }
}


/** The function `insertTaskProgress` updates the progress bar and text for a specific task based on the completion status of its subtasks. */
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


/** The function `startDragging` sets the currently dragged category and ID when an item is being dragged. */
function startDragging(i, j) {
    currentlyDraggedCategory = i;
    currentlyDraggedId = j;
}


/** The function `allowDrop` prevents the default behavior of an event. */
function allowDrop(event) { event.preventDefault(); }


/** The function `changeCategory` moves a task from one category to another in a task management system. */
async function changeCategory(category) {
    const taskTypeString = taskTypesKeys[currentlyDraggedCategory];
    let removedTask = tasks[taskTypeString].splice(currentlyDraggedId, 1)[0];
    tasks[category].push(removedTask);
    await setItem('tasks', tasks);
    boardInit();
}


/** The function `showAddTaskFloating` displays a floating element for adding a task based on the specified type. */
function showAddTaskFloating(type) {
    document.getElementById('addTaskFloating').classList.remove('d-none');
    document.getElementById('addTaskFloatingBg').classList.remove('d-none');
    selectedType = type;
    disableScrolling();
    document.getElementById('closeIcon').classList.remove('d-none');
}


/** The function `hideAddTaskFloating` hides the floating add task element and background. */
function hideAddTaskFloating() {
    document.getElementById('addTaskFloating').classList.add('d-none');
    document.getElementById('addTaskFloatingBg').classList.add('d-none');
    enableScrolling();
}


/** The `search` function filters tasks based on a search input and displays matching tasks on the webpage. */
function search() {
    let search = document.getElementById('searchInput').value.trim().toLowerCase();
    clearBoard();
    if (search === '') {
        iterateTaskTypes();
    } else {
        taskTypesKeys.forEach(function (taskTypeKey) {
            tasks[taskTypeKey].forEach(function (task, index) {
                if (task.title.toLowerCase().includes(search) || (task.description && task.description.toLowerCase().includes(search))) {
                    const taskHtml = generateTaskHtml(tasks[taskTypeKey], taskTypeKey === 'tasksToDo' ? 0 : 1, index);
                    document.getElementById(taskTypeKey).innerHTML += taskHtml;

                    // Task-Element-ID generieren
                    const taskElementId = `${taskTypeKey}Category${index}`;
                    const taskElement = document.getElementById(taskElementId);

                    // Prüfen, ob das Task-Element bereits eine Farbe hat
                    if (taskElement && !taskElement.dataset.colorSet) {
                        setTaskColor(taskTypeKey === 'tasksToDo' ? 0 : 1, index);
                        taskElement.dataset.colorSet = 'true'; // Markieren, dass die Farbe gesetzt wurde
                    }

                    // Sicherstellen, dass die Task-Eigenschaften existieren, bevor sie verwendet werden
                    if (task.assigned) {
                        insertTaskAssigned(taskTypeKey === 'tasksToDo' ? 0 : 1, index);
                    }
                    if (task.progress) {
                        insertTaskProgress(taskTypeKey === 'tasksToDo' ? 0 : 1, index);
                    }
                }
            });
        });
    }
}


/** The function `showTaskOverlay` displays task details based on the task type and index provided. */
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


/** The function `hideTaskOverlay` hides the task overlay element and enables scrolling on the page. */
function hideTaskOverlay() {
    document.getElementById('taskOverlay').classList.add('d-none');
    enableScrolling();
}


/** The `deleteTask` function deletes a selected task from the tasks list and updates the board display. */
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


/** The `editTask` function is used to populate a form with the details of a selected task for editing. */
function editTask() {
    hideTaskOverlay();

    if (typeof selectedTaskTypeIndex !== 'number' || typeof selectedTaskIndex !== 'number') {
        console.error('Ungültige Auswahl des Tasks');
        return;
    }

    const taskTypeKey = taskTypesKeys[selectedTaskTypeIndex];
    const taskType = tasks[taskTypeKey];

    if (!taskType || selectedTaskIndex >= taskType.length) {
        console.error('Ungültiger Task-Index');
        return;
    }

    const selectedTask = taskType[selectedTaskIndex];
    selectedType = taskTypeKey;

    showAddTaskFloating();

    document.getElementById('newTaskTitle').value = selectedTask.title;
    document.getElementById('newTaskDescription').value = selectedTask.description;
    document.getElementById('newTaskCategory').value = selectedTask.category;
    document.getElementById('newTaskDate').value = selectedTask.date;
    selectActivePriority(selectedTask.priority);

    selectedTask.assigned.forEach(name => {
        const checkbox = document.getElementById(name);
        if (checkbox) {
            checkbox.checked = true;
        }
    });

    if (selectedTask.subtasks && selectedTask.subtasks.length > 0) {
        selectedSubtask = selectedTask.subtasks.length;
        selectedTask.subtasks.forEach(subtask => {
            subtasks.push(subtask);
            addSubTask();
        });
    }

    const saveButton = document.getElementById('createTaskButton');
    saveButton.innerText = 'Save Task';
    saveButton.onclick = function() {
        saveEditedTask(taskTypeKey, selectedTaskIndex);
    };

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.classList.add('cancelButton');
    cancelButton.onclick = function() {
        hideAddTaskFloating();
    };
}


/** The function `saveEditedTask` updates the properties of a task object based on user input and saves the changes to local storage. */
async function saveEditedTask(taskTypeKey, taskIndex) {
    const task = tasks[taskTypeKey][taskIndex];

    task.title = document.getElementById('newTaskTitle').value;
    task.description = document.getElementById('newTaskDescription').value;
    task.category = document.getElementById('newTaskCategory').value;
    task.date = document.getElementById('newTaskDate').value;
    task.priority = selectedPriority;

    const assignedCheckboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]:checked');
    task.assigned = Array.from(assignedCheckboxes).map(checkbox => checkbox.value);

    task.subtasks = getAddedSubtasks();

    await setItem('tasks', tasks);
    boardInit();
    hideAddTaskFloating();
}


/** The function `setTaskOverlayColor` sets the background color of a task overlay based on its priority and category. */
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


/** The function `insertTaskOverlayAssigned` populates the taskAssigned element with initials of assignees for a specific task type and index. */
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


/** The function `insertOverlaySubtasks` iterates through subtasks of a task type and generates HTML elements based on whether the subtask is done or not. */
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


/** The function generates HTML code for displaying completed subtasks within an overlay for a specific task type. */
function generateOverlaySubtasksHtmlDone(taskType, i, j, k) {
    document.getElementById('taskOverlaySubtasks').innerHTML += /*html*/`
    <div class="d-flex align-items-center gap-2 mb-1">
        <img src="/img/icon/checkbox-checked.svg" alt="Clear checkbox">
        <p>${taskType[j].subtasks[k].title}</p>
    </div>
        `
}


/** The function generates HTML elements for displaying subtasks that are not done, using data from a specific task type. */
function generateOverlaySubtasksHtmlNotDone(taskType, i, j, k) {
    document.getElementById('taskOverlaySubtasks').innerHTML += /*html*/`
    <div class="d-flex align-items-center gap-2 mb-1">
        <img src="/img/icon/checkbox.svg" alt="Clear checkbox">
        <p>${taskType[j].subtasks[k].title}</p>
    </div>
        `
}


/** The function `disableScrolling` disables scrolling on a webpage by setting the overflow style of the document element to 'hidden' and the scroll property of the body to 'no'. */
function disableScrolling() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}


/** The function `enableScrolling` sets the CSS `overflow` property of the `documentElement` to 'scroll' and enables scrolling on the body element. */
function enableScrolling() {
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
}