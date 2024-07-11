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

let localTasks = JSON.parse(localStorage.getItem('tasks'));

async function showNumbers(){
    showNumberOfTasks();
    showNumberOfTasksInProgress();
    showNumberOfDoneTasks();
};

function showNumberOfTasks(){
    let totalTasks = 0;
    for (let key in localTasks) {
        if (localTasks.hasOwnProperty(key)) {
            totalTasks += localTasks[key].length;
        }
    }
    let noT = document.getElementById('numberOfTasks');
    noT.innerHTML = totalTasks;
}

function showNumberOfTasksInProgress(){
    let tasksInProgressCount = localTasks.tasksInProgress.length;
    let noTInProgress = document.getElementById('numberOfTasksInProgress');
    noTInProgress.innerHTML = tasksInProgressCount;
}


function showNumberOfTasksAwaitingFeedback(){
    let tasksAwaitingFeedbackCount = localTasks.tasksAwaitFeedback.length;
    let noTDone = document.getElementById('numberOfDoneTasks');
    noTDone.innerHTML = tasksAwaitingFeedbackCount;
}