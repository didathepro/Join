let selectedPriority = 'Medium';
let selectedSubtask = 0;
let selectedType = 'tasksToDo';

let addTaskContacts = [
    {
        name: 'Sofia Müller',
        color: '#00bee8'
    },
    {
        name: 'Anton Meyer',
        color: '#ff7a00'
    },
    {
        name: 'Anja Schulz',
        color: '#9327ff'
    },
    {
        name: 'Benedikt Ziegler',
        color: '#6e52ff'
    },
    {
        name: 'David Eisenberg',
        color: '#fc71ff'
    },
    {
        name: 'Eva Fischer',
        color: '#ffbb2b'
    },
    {
        name: 'Emmanuel Mauer',
        color: '#1fd7c1'
    },
    {
        name: 'Marcel Bauer',
        color: '#462f8a'
    },
    {
        name: 'Tatjana Wolf',
        color: '#ff4646'
    }
]

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

async function addNewTask() {
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
    await setItem('tasks', tasks);
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
    document.getElementById('addedSubTasks').innerHTML += `<li id="liSub${selectedSubtask}" class="liSub">
    <span id="subtaskText${selectedSubtask}">${subtasks[selectedSubtask]}</span>
    <div class="subImg">
    <img src="assets/img/edit.png" class="editSubtask" data-id="${selectedSubtask}">
    <img src="/assets/img/Vector 19.png">
    <img src="/assets/img/delete.png" class="deleteSubtask" data-id="${selectedSubtask}">
    </div>    
        </li>`;


    document.querySelectorAll(`.editSubtask[data-id="${selectedSubtask}"]`).forEach(el => {
        el.addEventListener('click', function() {
            editSubtask(this.getAttribute('data-id'));
            });
        });
    document.querySelectorAll(`.deleteSubtask[data-id="${selectedSubtask}"]`).forEach(el => {
        el.addEventListener('click', function() {
            deleteSubTask(this.getAttribute('data-id'));
            });
        });
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

function editSubtask(id) {
    const subtaskElement = document.getElementById(`subtaskText${id}`);
    const currentText = subtaskElement.innerText;
    subtaskElement.outerHTML = `<input type="text" id="subtaskInput${id}" value="${currentText}" onblur="saveSubtask(${id})" onkeypress="handleKeyPress(event, ${id})" />`;
    document.getElementById(`subtaskInput${id}`).focus();
}

function saveSubtask(id) {
    const inputElement = document.getElementById(`subtaskInput${id}`);
    const newText = inputElement.value;
    const liElement = inputElement.closest('li');
    liElement.innerHTML = `<span id="subtaskText${id}" onclick="editSubtask(${id})">${newText}</span>
                           <div class="subImg">
                               <img src="assets/img/edit.png" class="editSubtask" data-id="${id}">
                               <img src="/assets/img/Vector 19.png">
                               <img src="/assets/img/delete.png" class="deleteSubtask" data-id="${id}">
                           </div>`;
    subtasks[id] = newText;

    liElement.querySelector('.editSubtask').addEventListener('click', function() {
        editSubtask(this.getAttribute('data-id'));
    });
    liElement.querySelector('.deleteSubtask').addEventListener('click', function() {
        deleteSubTask(this.getAttribute('data-id'));
    });
}

function handleKeyPress(event, id) {
    if (event.key === 'Enter') {
        saveSubtask(id);
    }
}

function deleteSubTask(id) {
    const liElement = document.getElementById(`liSub${id}`);
    liElement.parentNode.removeChild(liElement);
}

function insertContactsHtml(i) {
    return /*html*/`
        <option value="${addTaskContacts[i].name}" class="d-flex justify-content-between">
            <div>
                <div class="contactInitials">
                    ${getInitials(addTaskContacts[i].name)}
                </div>
                <p>${addTaskContacts[i].name}</p>
            </div>
            <img src="/img/icon/checkbox.svg" alt="Checkbox">
        </option>
    `
}

function getSelectedAssigned() {
    const selectElement = document.getElementById('newTaskAssigned');
    var selectedOptions;
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


function getInitials(name) {
    const firstLetters = name.match(/\b(\w)/g);
    return firstLetters.join('');
}

window.onload = async function() {
    insertContacts();
    await loadTasks();
  };