let selectedPriority = 'Medium';
let selectedSubtask = 0;

let addTaskContacts = [
    { name: 'Sofia Müller', color: '#00bee8' },
    { name: 'Anton Meyer', color: '#ff7a00' },
    { name: 'Anja Schulz', color: '#9327ff' },
    { name: 'Benedikt Ziegler', color: '#6e52ff' },
    { name: 'David Eisenberg', color: '#fc71ff' },
    { name: 'Eva Fischer', color: '#ffbb2b' },
    { name: 'Emmanuel Mauer', color: '#1fd7c1' },
    { name: 'Marcel Bauer', color: '#462f8a' },
    { name: 'Tatjana Wolf', color: '#ff4646' }
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
    addedTaskAnimation();
    boardInit();
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

function resetSubtaskIcons() {
    if (selectedSubtask < (subtasks.length - 1)) {
        document.getElementById('subtasksPlus').classList.remove('d-none');
    }
    document.getElementById('subtasksCross').classList.add('d-none');
    document.getElementById('subtasksCheckmark').classList.add('d-none');
}

function addSubTask() {
    document.getElementById('addedSubTasks').innerHTML += `
        <li id="liSub${selectedSubtask}" class="liSub">
            <span id="subtaskText${selectedSubtask}">${subtasks[selectedSubtask]}</span>
            <div class="subImg">
                <img id="editSubtask${selectedSubtask}" onclick="editSubtask(${selectedSubtask})" src="assets/img/edit.png">
                <img src="/assets/img/Vector 19.png">
                <img id="deleteSubtask${selectedSubtask}" onclick="deleteSubTask(${selectedSubtask})" src="/assets/img/delete.png">
            </div>
        </li>`;
    document.getElementById('subtasksField').style.color = '#D1D1D1';
    document.getElementById('subtasksField').innerHTML = `Add new task`;
    if (typeof resetSubtaskIcons === 'function') {
        resetSubtaskIcons();
    } else {
        console.error("resetSubtaskIcons is not defined or not a function");
    }
    selectedSubtask++;
}

function clearSubTask() {
    resetSubtaskIcons();
    document.getElementById('subtasksField').style.color = '#D1D1D1';
    document.getElementById('subtasksField').innerHTML = `Add new task`;
}

function getAddedSubtasks() {
    return subtasks.slice(0, selectedSubtask);
}

// function insertContacts() {
//     if (addTaskContacts) {
//         for (let i = 0; i < addTaskContacts.length; i++) {
//             document.getElementById('newTaskAssigned').innerHTML += insertContactsHtml(i);
//         };
//     };
// }

function insertContacts() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.innerHTML = ''; // Clear any existing options
    addTaskContacts.forEach(contact => {
        const optionDiv = document.createElement('div');
        const initialsDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        label.className = 'labelEl'

        initialsDiv.className = 'contact-initials';
        initialsDiv.style.backgroundColor = contact.color;
        initialsDiv.innerText = getInitials(contact.name);

        checkbox.type = 'checkbox';
        checkbox.value = contact.name;
        checkbox.id = contact.name;

        checkbox.addEventListener('change', updateSelectedContacts);

        label.htmlFor = contact.name;
        label.innerText = contact.name;

        optionDiv.appendChild(initialsDiv);
        optionDiv.appendChild(label);
        optionDiv.appendChild(checkbox);

        dropdownMenu.appendChild(optionDiv);
    });
}

function updateSelectedContacts() {
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]');
    const selectedOptions = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const selectedContactsDiv = document.getElementById('selectedContacts');

    selectedContactsDiv.innerHTML = '';

    selectedOptions.forEach(name => {
        const contact = addTaskContacts.find(contact => contact.name === name);
        const contactDiv = document.createElement('div');
        const initialsDiv = document.createElement('div');

        initialsDiv.className = 'contact-initials';
        initialsDiv.style.backgroundColor = contact.color;
        initialsDiv.innerText = getInitials(contact.name);

        contactDiv.appendChild(initialsDiv);

        selectedContactsDiv.appendChild(contactDiv);
    });
}

function editSubtask(id) {
    const subtaskElement = document.getElementById(`subtaskText${id}`);
    let imgCheck = document.getElementById(`deleteSubtask${id}`).src = "/assets/img/check.png"
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
                               <img src="assets/img/edit.png" onclick="editSubtask(${id})">
                               <img src="/assets/img/Vector 19.png">
                               <img src="/assets/img/delete.png" onclick="deleteSubTask(${id})">
                           </div>`;
    subtasks[id] = newText;
}

function handleKeyPress(event, id) {
    if (event.key === imgCheck) {
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

// function getSelectedAssigned() {
//     const selectElement = document.getElementById('newTaskAssigned');
//     var selectedOptions = [];
//     for (var i = 0; i < selectElement.options.length; i++) {
//         const option = selectElement.options[i];
//         if (option.selected) {
//             selectedOptions.push(option.value);
//         }
//     }
//     return selectedOptions;
// }

function getSelectedAssigned() {
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]:checked');
    const selectedOptions = Array.from(checkboxes).map(checkbox => checkbox.value);
    const selectedContactsDiv = document.getElementById('selectedContacts');
    // Clear previous selections
    selectedContactsDiv.innerHTML = '';

    // Display selected contacts
    selectedOptions.forEach(name => {
        const contact = addTaskContacts.find(contact => contact.name === name);
        const contactDiv = document.createElement('div');
        const initialsDiv = document.createElement('div');

        initialsDiv.className = 'contact-initials';
        initialsDiv.style.backgroundColor = contact.color;
        initialsDiv.innerText = getInitials(contact.name);

        contactDiv.appendChild(initialsDiv);
        contactDiv.appendChild(document.createTextNode(contact.name));

        selectedContactsDiv.appendChild(contactDiv);
    });
    console.log(selectedOptions);
    return selectedOptions;
}

async function loadTasks() {
    const loadedTasks = await getItem('tasks');
    tasks = await JSON.parse(loadedTasks);
}


// function getInitials(name) {
//     const firstLetters = name.match(/\b(\w)/g);
//     return firstLetters.join('');
// }

function getInitials(name) {
    const names = name.split(' ');
    return names.map(n => n[0]).join('');
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function addedTaskAnimation() {
    document.getElementById('taskAdded').classList.remove('d-none');
    setTimeout(redirectBoard, 1000);
}

function redirectBoard() {
    window.location.href = "board.html";
}

window.onload = async function () {
    insertContacts();
    await loadTasks();
};