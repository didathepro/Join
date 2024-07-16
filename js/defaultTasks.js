/* The `tasks` object is storing information about different tasks for join. These are only some basic imcomplete default tasks.*/
let tasks = {
    "tasksToDo": [
        {
            "title": "Search Functionality",
            "description": "Implement site-wide search functionality...",
            "category": "Technical Task",
            "subtasks": [
              {"title": "Setup search API"   , "done": false},
              {"title": "Integrate search UI", "done": true }
            ],
            "assigned": ["Tatjana Wolf", "Benedikt Ziegler"],
            "priority": "Medium",
            "date": "2024-11-30"
          },
          {
            "title": "Order History",
            "description": "Develop the order history page for users...",
            "category": "User Story",
            "subtasks": [
              {"title": "Design order history UI", "done": false},
              {"title": "Integrate with backend" , "done": false}
            ],
            "assigned": ["Eva Fischer", "David Eisenberg"],
            "priority": "Low",
            "date": "2024-07-14"
          }
    ],
    "tasksInProgress":
        [
            {
                "title": "Email Notifications",
                "description": "Setup email notifications for various events...",
                "category": "Technical Task",
                "subtasks": [
                  {"title": "Configure email server", "done": false},
                  {"title": "Design email templates", "done": true }
                ],
                "assigned": ["Anja Schulz", "David Eisenberg"],
                "priority": "Medium",
                "date": "2024-07-22"
              },
              {
                "title": "Admin Panel",
                "description": "Develop an admin panel for managing the application...",
                "category": "Technical Task",
                "subtasks": [],
                "assigned": ["David Eisenberg", "Benedikt Ziegler"],
                "priority": "Urgent",
                "date": "2024-09-03"
              }
        ],
    "tasksAwaitFeedback":
        [
            {
                "title": "User Profile Page",
                "description": "Create user profile management page...",
                "category": "User Story",
                "subtasks": [
                  {"title": "Design profile UI"             , "done": false},
                  {"title": "Develop profile update feature", "done": false}
                ],
                "assigned": ["Anja Schulz", "Eva Fischer"],
                "priority": "Urgent",
                "date": "2024-08-18"
              },
              {
                "title": "Live Chat Support",
                "description": "Implement live chat support for user assistance...",
                "category": "User Story",
                "subtasks": [
                  {"title": "Setup chat backend", "done": true},
                  {"title": "Integrate chat UI" , "done": true}
                ],
                "assigned": ["Anja Schulz", "Eva Fischer"],
                "priority": "Medium",
                "date": "2024-11-11"
              }
        ],
    "tasksDone":
        [
            {
                "title": "User Profile Page",
                "description": "Create user profile management page...",
                "category": "User Story",
                "subtasks": [
                  {"title": "Design profile UI"             , "done": false},
                  {"title": "Develop profile update feature", "done": false}
                ],
                "assigned": ["Anja Schulz", "Eva Fischer"],
                "priority": "Urgent",
                "date": "2024-08-18"
              },
              {
                "title": "Live Chat Support",
                "description": "Implement live chat support for user assistance...",
                "category": "User Story",
                "subtasks": [
                  {"title": "Setup chat backend", "done": true},
                  {"title": "Integrate chat UI" , "done": true}
                ],
                "assigned": ["Anja Schulz", "Eva Fischer"],
                "priority": "Medium",
                "date": "2024-11-11"
              }
        ],
};


/* Setting default tasks if no task is specified*/
async function setDefaultTasks() {
    await setItem('tasks', tasks);
}