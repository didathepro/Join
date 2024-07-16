/** The function `showNumbers` displays the number of tasks, tasks in progress, and tasks awaiting feedback. */
async function showNumbers() {
    showNumberOfTasks();
    showNumberOfTasksInProgress();
    showNumberOfTasksAwaitingFeedback();
    showNumberOfTasksToDo();
    showNumberOfDoneTasks();
    showNumberOfUrgentTasks();
};


/** The function `showNumberOfTasks` calculates the total number of tasks stored in the `tasks` object and displays it on the webpage. */
function showNumberOfTasks() {
    let totalTasks = 0;
    for (let key in tasks) {
        if (tasks.hasOwnProperty(key)) { totalTasks += tasks[key].length; }
    }
    let noT = document.getElementById('numberOfTasks');
    noT.innerHTML = totalTasks;
}


/** The function `showNumberOfTasksInProgress` retrieves the number of tasks in progress from a local variable and displays it on the webpage. */
function showNumberOfTasksInProgress() {
    let tasksInProgressCount = tasks.tasksInProgress.length;
    document.getElementById('numberOfTasksInProgress').innerHTML = tasksInProgressCount;
}


/** The function `showNumberOfTasksAwaitingFeedback` updates the number of tasks awaiting feedback on a webpage. */
function showNumberOfTasksAwaitingFeedback() {
    let tasksAwaitingFeedbackCount = tasks.tasksAwaitFeedback.length;
    document.getElementById('numberOfTasksAwaitingFeedback').innerHTML = tasksAwaitingFeedbackCount;
}

/** This function updates the number of tasks to do. */
function showNumberOfTasksToDo() {
    let tasksToDo = document.getElementById('numberOfTasksToDo');
    let tasksToDoCount = tasks.tasksToDo.length;
    tasksToDo.innerHTML = tasksToDoCount;
}


/** This function updates the number of done tasks. */
function showNumberOfDoneTasks() {
    let doneTasks = document.getElementById('numberOfDoneTasks');
    let doneTasksCount = tasks.tasksDone.length;
    doneTasks.innerHTML = doneTasksCount;
}


/** This function updates the number of urgent tasks. */
function showNumberOfUrgentTasks() {
    let urgentTasks = document.getElementById('numberOfUrgentTasks');
    let urgentDate = document.getElementById('urgentTaskDate');
    let urgentTasksCount = countUrgentTasks(tasks).count;
    let urgentTasksDate = countUrgentTasks(tasks).dates[0];
    urgentTasks.innerHTML = urgentTasksCount;
    urgentDate.innerHTML = urgentTasksDate;
}


/** This function counts and reutrns the number of urgent tasks.  */
function countUrgentTasks(tasks) {
    let urgentCount = 0;
    let urgentDates = [];
    for (let category in tasks) {
        tasks[category].forEach(task => {
            if (task.priority === 'Urgent') {
                urgentCount++;
                if (task.date) { urgentDates.push(task.date) };
            }
        });
    }
    return {
        count: urgentCount,
        dates: urgentDates
    };
}