/* The `tasks` object is storing information about different tasks for join. These are only some basic imcomplete default tasks.*/
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