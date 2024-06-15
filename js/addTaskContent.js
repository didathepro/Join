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


/** The function `selectActivePriority` is used to set a priority as active by updating its styling and icon. */
function selectActivePriority(priority) {
    clearActivePriority();
    selectedPriority = priority;
    document.getElementById(`addTaskPriority${priority}`).classList.add(`priority${priority}Active`);
    document.getElementById(`addTaskPriority${priority}Icon`).src = `img/icon/priority${priority}White.svg`;
}


/** The function `clearActivePriority` removes all possible active priority classes and resets icons for task priorities. */
function clearActivePriority() {
    document.getElementById('addTaskPriorityUrgent').classList.remove('priorityUrgentActive');
    document.getElementById('addTaskPriorityMedium').classList.remove('priorityMediumActive');
    document.getElementById('addTaskPriorityLow').classList.remove('priorityLowActive');
    document.getElementById('addTaskPriorityUrgentIcon').src = '/img/icon/priorityUrgent.svg';
    document.getElementById('addTaskPriorityMediumIcon').src = '/img/icon/priorityMedium.svg';
    document.getElementById('addTaskPriorityLowIcon').src = '/img/icon/priorityLow.svg';
}

/** The function `addTaskClear` resets all input fields and selections related to adding a new task. */
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

/** The `addNewTask` function adds a new task with specified details to the task JSON and updates the remote storage, triggering an animation and reinitializing the board. */
async function addNewTask() {
    addTaskClear()
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

/** The function `loadSubTask` adds a subtast text to the input field and updates the visible buttons. */
// function loadSubTask() {
//     if (subtasks[selectedSubtask]) {
//         document.getElementById('subtasksField').style.color = '#000';
//         document.getElementById('subtasksField').innerHTML = `${subtasks[selectedSubtask]}`;
//         document.getElementById('subtasksPlus').classList.add('d-none');
//         document.getElementById('subtasksCross').classList.remove('d-none');
//         document.getElementById('subtasksCheckmark').classList.remove('d-none');
//     }
// }


/** The function `resetSubtaskIcons` restores the add button if there are subtasks left and hides the other buttons. */
// function resetSubtaskIcons() {
//     if (selectedSubtask < (subtasks.length - 1)) {
//         document.getElementById('subtasksPlus').classList.remove('d-none');
//     }
//     document.getElementById('subtasksCross').classList.add('d-none');
//     document.getElementById('subtasksCheckmark').classList.add('d-none');
// }


/** The `addSubTask` function dynamically adds a new subtask to a list with corresponding edit and delete icons. */
// function addSubTask() {
//     document.getElementById('addedSubTasks').innerHTML += `
//         <li id="liSub${selectedSubtask}" class="liSub">
//             <span id="subtaskText${selectedSubtask}">${subtasks[selectedSubtask]}</span>
//             <div class="subImg">
//                 <img id="editSubtask${selectedSubtask}" onclick="editSubtask(${selectedSubtask})" src="assets/img/edit.png">
//                 <img src="/assets/img/Vector 19.png">
//                 <img id="deleteSubtask${selectedSubtask}" onclick="deleteSubTask(${selectedSubtask})" src="/assets/img/delete.png">
//             </div>
//         </li>`;
//     document.getElementById('subtasksField').style.color = '#D1D1D1';
//     document.getElementById('subtasksField').innerHTML = `Add new task`;
//     if (typeof resetSubtaskIcons === 'function') {
//         resetSubtaskIcons();
//     } else {
//         console.error("resetSubtaskIcons is not defined or not a function");
//     }
//     selectedSubtask++;
// }

function initSubTask() {
    for (let [index_subtask, current_subtask] of Object.entries(subtasks)) {
        const newSubTaskHTML = `
            <li id="liSub${index_subtask}" class="liSub">
                <span id="subtaskText${index_subtask}">${current_subtask.title}</span>
                <div class="subImg">
                    <img id="editSubtask${index_subtask}" onclick="editSubtask(${index_subtask})" src="assets/img/edit.png">
                    <img src="/assets/img/Vector 19.png">
                    <img id="deleteSubtask${index_subtask}" onclick="deleteSubTask(${index_subtask})" src="/assets/img/delete.png">
                </div>
            </li>`;
    
        // Log the generated HTML for debugging
        console.log(`Generated HTML: ${newSubTaskHTML}`);
    
        // Append the new list item to the addedSubTasks element
        document.getElementById('addedSubTasks').insertAdjacentHTML('beforeend', newSubTaskHTML);
    }
}

function addSubTask() {
    const subtaskInput = document.getElementById('subtasksField');
    const subtaskText = subtaskInput.value.trim();

    // Add the subtask text to the subtasks array
    console.log("subtasks : ", subtasks);
    // subtasks[selectedSubtask] = subtaskText;


    // Create a new list item with the subtask text
    const newSubTaskHTML = `
        <li id="liSub${selectedSubtask}" class="liSub">
            <span id="subtaskText${selectedSubtask}">${subtaskText}</span>
            <div class="subImg">
                <img id="editSubtask${selectedSubtask}" onclick="editSubtask(${selectedSubtask})" src="assets/img/edit.png">
                <img src="/assets/img/Vector 19.png">
                <img id="deleteSubtask${selectedSubtask}" onclick="deleteSubTask(${selectedSubtask})" src="/assets/img/delete.png">
            </div>
        </li>`;

    // Log the generated HTML for debugging
    console.log(`Generated HTML: ${newSubTaskHTML}`);

    // Append the new list item to the addedSubTasks element
    document.getElementById('addedSubTasks').insertAdjacentHTML('beforeend', newSubTaskHTML);

    // Clear the input field
    subtaskInput.value = '';
    subtaskInput.style.color = '#D1D1D1';
    subtaskInput.placeholder = 'Add new task';

    // Call resetSubtaskIcons if it is defined
    // if (typeof resetSubtaskIcons === 'function') {
    //     resetSubtaskIcons();
    // } else {
    //     console.error("resetSubtaskIcons is not defined or not a function");
    // }

    // Increment the selectedSubtask index
    selectedSubtask++;
}



/** The function clearSubTask resets subtask icons, changes the text color to gray, and sets the inner HTML to "Add new task". */
function clearSubTask() {
    resetSubtaskIcons();
    document.getElementById('subtasksField').style.color = '#D1D1D1';
    document.getElementById('subtasksField').innerHTML = `Add new task`;
}


/** This function returns a subset of subtasks up to the selected subtask index. */
function getAddedSubtasks() {
    return subtasks.slice(0, selectedSubtask);
}


/** The function `insertContacts` dynamically populates a dropdown menu with contacts, displaying their initials, names, and checkboxes. */
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


/** The function `updateSelectedContacts` updates the list of selected contacts displayed on the webpage based on the checkboxes that are checked. */
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
        contactDiv.appendChild(document.createTextNode(contact.name));

        selectedContactsDiv.appendChild(contactDiv);
    });
}


/** The `editSubtask` function allows users to edit a subtask by replacing the text element with an input field. */
function editSubtask(id) {
    const subtaskElement = document.getElementById(`subtaskText${id}`);
    let imgCheck = document.getElementById(`deleteSubtask${id}`).src = "assets/img/check.png"
    const currentText = subtaskElement.innerText;
    subtaskElement.outerHTML = `<input type="text" id="subtaskInput${id}" value="${currentText}" onblur="saveSubtask(${id})" onkeypress="handleKeyPress(event, ${id})" />`;
    document.getElementById(`subtaskInput${id}`).focus();
}


/** The `saveSubtask` function updates the text of a subtask element based on user input and saves the changes. */
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


/** The function `handleKeyPress` takes an event and an id as parameters, and if the key pressed is* equal to `imgCheck`, it calls the `saveSubtask` function with the provided id. */
function handleKeyPress(event, id) {
    if (event.key === imgCheck) {
        saveSubtask(id);
    }
}


/** The function `deleteSubTask` removes a subtask element from the DOM based on its ID. */
function deleteSubTask(id) {
    const liElement = document.getElementById(`liSub${id}`);
    liElement.parentNode.removeChild(liElement);
}


/** The function `insertContactsHtml` generates HTML options for a select element based on contact data. */
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


/** The function `getSelectedAssigned` retrieves the selected contacts from a dropdown menu and displays them with their initials in a separate div. */
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


/** The function `loadTasks` asynchronously loads tasks from local storage and parses them as JSON. */
async function loadTasks() {
    const loadedTasks = await getItem('tasks');
    tasks = await JSON.parse(loadedTasks);
}


/** The function `getInitials` takes a name as input and returns the initials of each word in the name. */
function getInitials(name) {
    const names = name.split(' ');
    return names.map(n => n[0]).join('');
}


/** * The function `toggleDropdown` toggles the visibility of a dropdown menu by adding or removing the 'show' class. */
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
    } else {
    }
}


/** The `addedTaskAnimation` function removes the 'd-none' class from an element with the id 'taskAdded' to display it, and then calls the `redirectBoard` function after a delay of 1000 milliseconds. */
function addedTaskAnimation() {
    document.getElementById('taskAdded').classList.remove('d-none');
    setTimeout(redirectBoard, 1000);
}


/** The function `redirectBoard` redirects the user to the "board.html" page. */
function redirectBoard() {
    window.location.href = "board.html";
}


/** When the window loads, it calls the `insertContacts()` function and then awaits the completion of the `loadTasks()` function. */
window.onload = async function () {
    insertContacts();
    await loadTasks();
};