function selectActivePriority(priority) {
    clearActivePriority();
    if (priority == 'Urgent') {
        document.getElementById('addTaskPriorityUrgent').classList.add('priorityUrgentActive');
        document.getElementById('addTaskPriorityUrgentIcon').src = '/img/icon/priorityUrgentWhite.svg';
    }
    if (priority == 'Medium') {
        document.getElementById('addTaskPriorityMedium').classList.add('priorityMediumActive');
        document.getElementById('addTaskPriorityMediumIcon').src = '/img/icon/priorityMediumWhite.svg';
    }
    if (priority == 'Low') {
        document.getElementById('addTaskPriorityLow').classList.add('priorityLowActive');
        document.getElementById('addTaskPriorityLowIcon').src = '/img/icon/priorityLowWhite.svg';
    }
}

function clearActivePriority() {
    document.getElementById('addTaskPriorityUrgent').classList.remove('priorityUrgentActive');
    document.getElementById('addTaskPriorityMedium').classList.remove('priorityMediumActive');
    document.getElementById('addTaskPriorityLow').classList.remove('priorityLowActive');
    document.getElementById('addTaskPriorityUrgentIcon').src = '/img/icon/priorityUrgent.svg';
    document.getElementById('addTaskPriorityMediumIcon').src = '/img/icon/priorityMedium.svg';
    document.getElementById('addTaskPriorityLowIcon').src = '/img/icon/priorityLow.svg';
}