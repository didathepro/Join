let selectedPriority = 'Medium';

function selectActivePriority(priority) {
    clearActivePriority();
    selectedPriority = priority;
    document.getElementById(`addTaskPriority${priority}`).classList.add(`priority${priority}Active`);
    document.getElementById(`addTaskPriority${priority}Icon`).src = `img/icon/priority${priority}White.svg`;
}

function clearActivePriority() {
    document.getElementById('addTaskPriorityUrgent').classList.remove('priorityUrgentActive');
    document.getElementById('addTaskPriorityMedium').classList.remove('priorityMediumActive');
    document.getElementById('addTaskPriorityLow').classList.remove('priorityLowActive');
    document.getElementById('addTaskPriorityUrgentIcon').src = '/img/icon/priorityUrgent.svg';
    document.getElementById('addTaskPriorityMediumIcon').src = '/img/icon/priorityMedium.svg';
    document.getElementById('addTaskPriorityLowIcon').src = '/img/icon/priorityLow.svg';
}

function addNewTask() {
    const newTaskTitle = document.getElementById('newTaskTitle').value;
    const newTaskDescription = document.getElementById('newTaskDescription').value;
    const newTaskAssigned = document.getElementById('newTaskAssigned').value;
    const newTaskDate = document.getElementById('newTaskDate').value;
    const newTaskPriority = selectedPriority;
    const newTaskCategory = document.getElementById('newTaskCategory').value;
    // const newTaskSubtasks = document.getElementById('newTaskSubtasks').value;
    addNewTaskJSON(newTaskTitle, newTaskDescription, newTaskAssigned, newTaskDate, newTaskPriority, newTaskCategory,
        // newTaskSubtasks
    );
}

function addNewTaskJSON(newTaskTitle, newTaskDescription, newTaskAssigned, newTaskDate, newTaskPriority, newTaskCategory, newTaskSubtasks) {
    let newTask = {
        "title": newTaskTitle,
        "description": newTaskDescription,
        "category": newTaskCategory,
        "subtasks": newTaskSubtasks,
        "assigned": newTaskAssigned,
        "priority": newTaskPriority,
        "date": newTaskDate
    };
    tasks['tasksToDo'].push(newTask);
}