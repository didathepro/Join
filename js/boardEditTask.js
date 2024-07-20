/**M The `deleteTask` function deletes a selected task from the tasks list and updates the board display. */
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


/**M The `editTask` function is used to populate a form with the details of a selected task for editing. */
function editTask() {
    document.getElementById('addedSubTasks').innerHTML = '';
    hideTaskOverlay();
    const taskTypeKey = taskTypesKeys[selectedTaskTypeIndex];
    const taskType = tasks[taskTypeKey];
    const selectedTask = taskType[selectedTaskIndex];
    selectedType = taskTypeKey;
    editTaskHtml(selectedTask);
    showAddTaskFloating(taskTypeKey);
    selectActivePriority(selectedTask.priority);
    selectedTask.assigned.forEach(name => {
        const checkbox = document.getElementById(name);
        if (checkbox) { checkbox.checked = true; }
    });
    editTaskPush(selectedTask);
    editTaskButtons(taskTypeKey);
}


/**M The function `editTaskHtml` updates the HTML elements with the details of a selected task for editing.*/
function editTaskHtml(selectedTask) {
    document.getElementById('editTaskTitle').innerHTML = "Edit Task";
    document.getElementById('addTaskContent').style.marginTop = 0;
    document.getElementById('newTaskTitle').value = selectedTask.title;
    document.getElementById('newTaskDescription').value = selectedTask.description;
    document.getElementById('newTaskCategory').value = selectedTask.category;
    document.getElementById('newTaskDate').value = selectedTask.date;
}


/**M The function `editTaskButtons` updates the text and functionality of save and cancel buttons for editing a task. */
function editTaskButtons(taskTypeKey) {
    const createButton = document.getElementById('createTaskButton');
    createButton.classList.add('d-none');
    const saveButton = document.getElementById('saveTaskButton');
    saveButton.classList.remove('d-none');
    saveButton.onclick = function () { saveEditedTask(taskTypeKey, selectedTaskIndex); };
    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.classList.add('cancelButton');
    cancelButton.onclick = function () { hideAddTaskFloating(); };
}


/**M The function `editTaskPush` iterates over the subtasks of a selected task and pushes them into a global `subtasks` array. */
function editTaskPush(selectedTask) {
    if (selectedTask.subtasks && selectedTask.subtasks.length > 0) {
        selectedSubtask = selectedTask.subtasks.length;
        selectedTask.subtasks.forEach(subtask => { subtasks.push(subtask); });
        initSubTask();
    }
}


/**M The function `saveEditedTask` updates the properties of a task object based on user input and saves the changes to local storage. */
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