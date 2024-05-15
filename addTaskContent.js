let selectedPriority = 'Medium';
let selectedSubtask = 0;
let selectedType = 'tasksToDo';

let addTaskContacts = [
    {
        name: 'Sofia Müller',
        color: '#00bee8',
        initials: 'SM'
    },
    {
        name: 'Anton Meyer',
        color: '#ff7a00',
        initials: 'AM'
    },
    {
        name: 'Anja Schulz',
        color: '#9327ff',
        initials: 'AS'
    },
    {
        name: 'Benedikt Ziegler',
        color: '#6e52ff',
        initials: 'BZ'
    },
    {
        name: 'David Eisenberg',
        color: '#fc71ff',
        initials: 'DE'
    },
    {
        name: 'Eva Fischer',
        color: '#ffbb2b',
        initials: 'EF'
    },
    {
        name: 'Emmanuel Mauer',
        color: '#1fd7c1',
        initials: 'EM'
    },
    {
        name: 'Marcel Bauer',
        color: '#462f8a',
        initials: 'MB'
    },
    {
        name: 'Tatjana Wolf',
        color: '#ff4646',
        initials: 'TW'
    }
]

function insertContactsHtml(i) {
    return /*html*/`
        <option value="contact${i}" class="d-flex justify-content-between">
            <div>
                <div class="contactInitials">${addTaskContacts[i].initials}</div>
                <p>${addTaskContacts[i].name}</p>
            </div>
            <img src="/img/icon/checkbox.svg" alt="Checkbox">
        </option>
    `
}

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
    let newTask = {
        "title": document.getElementById('newTaskTitle').value,
        "description": document.getElementById('newTaskDescription').value,
        "category": document.getElementById('newTaskCategory').value,
        "assigned": getSelectedAssigned(),
        "priority": selectedPriority,
        "date": document.getElementById('newTaskDate').value,
        "subtasks": getAddedSubtasks()
    };
    tasks[selectedType].push(newTask);
    setItem('tasks', tasks);
}

function addTaskClear() {
    document.getElementById('newTaskTitle').value = '';
    document.getElementById('newTaskDescription').value = '';
    document.getElementById('newTaskAssigned').selectedIndex = 0;
    document.getElementById('newTaskDescription').value = '';
    document.getElementById('newTaskDate').value = '';
    document.getElementById('newTaskAssigned').selectedIndex = 0;
    document.getElementById('addedSubTasks').innerHTML = '';
    document.getElementById('newTaskCategory').value = 'Select task category';
    selectedSubtask = 0;
    clearSubTask();
    resetSubtaskIcons();
    selectActivePriority('Medium');
}

function loadSubTask() {
    if (subtasks[selectedSubtask]) {
        document.getElementById('subtasksField').style.color = '#000';
        document.getElementById('subtasksField').innerHTML = `${subtasks[selectedSubtask]}`;
        document.getElementById('subtasksPlus').classList.add('d-none');
        document.getElementById('subtasksCross').classList.remove('d-none');
        document.getElementById('subtasksCheckmark').classList.remove('d-none');
    }
}

function addSubTask() {
    document.getElementById('addedSubTasks').innerHTML += `<li>${subtasks[selectedSubtask]}</li>`;
    document.getElementById('subtasksField').style.color = '#D1D1D1';
    document.getElementById('subtasksField').innerHTML = `Add new task`;
    resetSubtaskIcons();
    selectedSubtask++;
}

function clearSubTask() {
    resetSubtaskIcons();
    document.getElementById('subtasksField').style.color = '#D1D1D1';
    document.getElementById('subtasksField').innerHTML = `Add new task`;
}

function resetSubtaskIcons() {
    if (selectedSubtask < (subtasks.length - 1)) {
        document.getElementById('subtasksPlus').classList.remove('d-none');
    }
    document.getElementById('subtasksCross').classList.add('d-none');
    document.getElementById('subtasksCheckmark').classList.add('d-none');
}

function getAddedSubtasks() {
    return subtasks.slice(0, selectedSubtask);
}

function insertContacts() {
    if (addTaskContacts) {
        for (let i = 0; i < addTaskContacts.length; i++) {
            document.getElementById('newTaskAssigned').innerHTML += insertContactsHtml(i);
        };
    };
}

function getSelectedAssigned() {
    const selectElement = document.getElementById('newTaskAssigned');
    var selectedOptions = [];
    for (var i = 0; i < selectElement.options.length; i++) {
        const option = selectElement.options[i];
        if (option.selected) {
            selectedOptions.push(option.value);
        }
    }
    return selectedOptions;
}

async function loadTasks() {
    const loadedTasks = await getItem('tasks');
    tasks = await JSON.parse(loadedTasks);
}

window.onload = async function() {
    insertContacts();
    loadTasks();
  };