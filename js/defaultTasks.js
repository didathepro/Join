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


/* The line is retrieving the value stored in the 'tasks' key from the localStorage, parsing it from a JSON string to a JavaScript object, and assigning it to the variable `localTasks`. This allows the script to access and workwith the tasks data stored in the browser's localStorage. */
let localTasks = JSON.parse(localStorage.getItem('tasks'));


/** The function `showNumbers` displays the number of tasks, tasks in progress, and tasks awaiting feedback. */
async function showNumbers() {
    showNumberOfTasks();
    showNumberOfTasksInProgress();
    showNumberOfTasksAwaitingFeedback();
};


/** The function `showNumberOfTasks` calculates the total number of tasks stored in the `localTasks` object and displays it on the webpage. */
function showNumberOfTasks() {
    let totalTasks = 0;
    for (let key in localTasks) {
        if (localTasks.hasOwnProperty(key)) { totalTasks += localTasks[key].length; }
    }
    let noT = document.getElementById('numberOfTasks');
    noT.innerHTML = totalTasks;
}


/** The function `showNumberOfTasksInProgress` retrieves the number of tasks in progress from a local variable and displays it on the webpage. */
function showNumberOfTasksInProgress() {
    let tasksInProgressCount = localTasks.tasksInProgress.length;
    let noTInProgress = document.getElementById('numberOfTasksInProgress');
    noTInProgress.innerHTML = tasksInProgressCount;
}


/** The function `showNumberOfTasksAwaitingFeedback` updates the number of tasks awaiting feedback on a webpage. */
function showNumberOfTasksAwaitingFeedback() {
    let tasksAwaitingFeedbackCount = localTasks.tasksAwaitFeedback.length;
    let noTDone = document.getElementById('numberOfDoneTasks');
    noTDone.innerHTML = tasksAwaitingFeedbackCount;
}