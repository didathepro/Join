/* The code blow initializes variables for a task management system. It sets the selected priority to 'Medium', the selected subtask to 0, and creates an array of task contacts with names and colors. */
async function addTaskInit() { await loadTasks(); }
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
    document.getElementById('addTaskPriorityUrgentIcon').src = 'img/icon/priorityUrgent.svg';
    document.getElementById('addTaskPriorityMediumIcon').src = 'img/icon/priorityMedium.svg';
    document.getElementById('addTaskPriorityLowIcon').src = 'img/icon/priorityLow.svg';
}


/** The function `addTaskClear` resets all input fields and selections related to adding a new task. */
function addTaskClear() {
    document.getElementById('newTaskTitle').value = '';
    document.getElementById('newTaskDescription').value = '';
    document.getElementById('newTaskDescription').value = '';
    document.getElementById('newTaskDate').value = '';
    document.getElementById('addedSubTasks').innerHTML = '';
    document.getElementById('newTaskCategory').value = 'Select task category';
    selectedSubtask = 0;
    clearSubTask();
    selectActivePriority('Medium');
    document.getElementById('selectedContacts').innerHTML = '';
    clearSelectedContacts();
}


/** The `addNewTask` function adds a new task with specified details to the task JSON and updates the remote storage, triggering an animation and reinitializing the board. */
async function addNewTask() {
    let newTask = {
        "title": document.getElementById('newTaskTitle').value,
        "description": document.getElementById('newTaskDescription').value,
        "category": document.getElementById('newTaskCategory').value,
        "assigned": getSelectedAssigned(),
        "priority": selectedPriority,
        "date": document.getElementById('newTaskDate').value,
        "subtasks": subtasks
    };
    tasks[selectedType].push(newTask);
    await setItem('tasks', tasks);
    addTaskClear();
    hideAddTaskFloating();
    subtasks = [];
    addedTaskAnimation();
}


/** This function initializes subtasks in the UI. */
function initSubTask() {
    for (let [index_subtask, current_subtask] of Object.entries(subtasks)) {
        const newSubTaskHTML = /*html*/`
            <li id="liSub${index_subtask}" class="liSub">
                <span id="subtaskText${index_subtask}">${current_subtask.title}</span>
                <div class="subImg">
                    <img id="editSubtask${index_subtask}" onclick="editSubtask(${index_subtask})" src="assets/img/edit.png">
                    <img src="assets/img/Vector 19.png">
                    <img id="deleteSubtask${index_subtask}" onclick="deleteSubTask(${index_subtask})" src="assets/img/delete.png">
                </div>
            </li>`;
        document.getElementById('addedSubTasks').insertAdjacentHTML('beforeend', newSubTaskHTML);
    }
}


/** This function adds a new subtask. */
function addSubTask() {
    getAddedSubtasks();
    const subtaskInput = document.getElementById('subtasksField');
    const subtaskText = subtaskInput.value.trim();
    if (subtaskText.length == 0) { alert('Cannot add an empty subtask'); }
    else {
        subtasks.push({ "title": subtaskText });
        const newSubTaskHTML = generateAddSubTaskHtml(subtaskText);
        document.getElementById('addedSubTasks').insertAdjacentHTML('beforeend', newSubTaskHTML);
        selectedSubtask++;
    }
    subtaskInput.value = '';
    subtaskInput.style.color = '#D1D1D1';
    subtaskInput.placeholder = 'Add new task';
}


/** This function generates and return the HTML for the addSubTask funtion.  */
function generateAddSubTaskHtml(subtaskText) {
    return /*html*/`
        <li id="liSub${selectedSubtask}" class="liSub">
            <span id="subtaskText${selectedSubtask}">${subtaskText}</span>
            <div class="subImg">
                <img id="editSubtask${selectedSubtask}" onclick="editSubtask(${selectedSubtask})" src="assets/img/edit.png">
                <img src="assets/img/Vector 19.png">
                <img id="deleteSubtask${selectedSubtask}" onclick="deleteSubTask(${selectedSubtask})" src="assets/img/delete.png">
            </div>
        </li>`
}


/**M The function `newSubTaskHTML` generates and returns HTML code for a new subtask element with specified text and unique identifier. */
function newSubTaskHTML(selectedSubtask, subtaskText) {
    return /*html*/`
        <li id="liSub${selectedSubtask}" class="liSub">
        <span id="subtaskText${selectedSubtask}">${subtaskText}</span>
        <div class="subImg">
            <img id="editSubtask${selectedSubtask}" onclick="editSubtask(${selectedSubtask})" src="assets/img/edit.png">
            <img src="assets/img/Vector 19.png">
            <img id="deleteSubtask${selectedSubtask}" onclick="deleteSubTask(${selectedSubtask})" src="assets/img/delete.png">
        </div>
        </li>`
}


/** The function clearSubTask resets subtask icons, changes the text color to gray, and sets the inner HTML to "Add new task". */
function clearSubTask() {
    document.getElementById('subtasksField').style.color = '#D1D1D1';
    document.getElementById('subtasksField').innerHTML = `Add new task`;
}


/** This function returns a subset of subtasks up to the selected subtask index. */
function getAddedSubtasks() { return subtasks.slice(0, selectedSubtask); }


/**M The function `insertContacts` dynamically populates a dropdown menu with contacts, displaying their initials, names, and checkboxes. */
function insertContacts() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedContacts = getSelectedContactNames();
    dropdownMenu.innerHTML = '';
    addTaskContacts.forEach((contact, index) => {
        const optionDiv = document.createElement('div');
        const initialsDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        optionDiv.id = `optionDiv-${index}`;
        insertContactsAttributes(contact, optionDiv, initialsDiv, checkbox, label);
        insertContactsListeners(dropdownMenu, optionDiv, checkbox, label, index);
        dropdownMenu.appendChild(optionDiv);
    });
    restoreSelectedContactNames(selectedContacts);
}


/** This function clears the checkboxes in the dropdown menu. */
function clearSelectedContacts() {
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}


/** This function is used to get the selected contact names.  */
function getSelectedContactNames() {
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]');
    return Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}


/** This function is used to restore the selected contact names. */
function restoreSelectedContactNames(selectedContacts) {
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (selectedContacts.includes(checkbox.value)) { checkbox.checked = true; }
        else { checkbox.checked = false; }
    });
}


/**M The function `insertContactsAttributes` is used to dynamically create and insert contact attributes like initials, checkboxes, and labels into a specified HTML element. */
function insertContactsAttributes(contact, optionDiv, initialsDiv, checkbox, label) {
    label.className = 'labelEl';
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
}


/**M The function `insertContactsListeners` adds event listeners to a dropdown menu option div and a checkbox, updating selected contacts when the option div is clicked. */
function insertContactsListeners(dropdownMenu, optionDiv, checkbox, index) {
    dropdownMenu.appendChild(optionDiv);
    document.addEventListener('mouseup', function (e) {
        if (!dropdownMenu.contains(e.target)) { dropdownMenu.classList.remove('show'); }
    });
}


/**M This function resets all checkboxes in the dropDownMenu. */
function clearAllCheckboxes() {
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}


/** This function updates selected contacts based on a specific task */
function selectedTask(i, j) {
    clearAllCheckboxes();
    const taskType = taskTypesKeys[i];
    const assignedContacts = tasks[taskType][j].assigned;
    assignedContacts.forEach(contactName => {
        const checkbox = document.querySelector(`#dropdownMenu input[value="${contactName}"]`);
        if (checkbox) { checkbox.checked = true; }
    });
    updateSelectedContacts();
}


/**M The function `updateSelectedContacts` updates the list of selected contacts displayed on the webpage based on the checkboxes that are checked. */
function updateSelectedContacts() {
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]');
    const selectedOptions = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const selectedContactsDiv = document.getElementById('selectedContacts');
    selectedContactsDiv.innerHTML = '';
    selectedOptions.forEach(name => { updateSelectedContactsAttributes(selectedContactsDiv, name); });
}


/**M The function `updateSelectedContactsAttributes` adds a contact's initials and name to a specified div element. */
function updateSelectedContactsAttributes(selectedContactsDiv, name) {
    const contact = addTaskContacts.find(contact => contact.name === name);
    if (contact) {
        const contactDiv = document.createElement('div');
        const initialsDiv = document.createElement('div');
        initialsDiv.className = 'contact-initials';
        initialsDiv.style.backgroundColor = contact.color;
        initialsDiv.innerText = getInitials(contact.name);
        contactDiv.appendChild(initialsDiv);
        contactDiv.appendChild(document.createTextNode(contact.name));
        selectedContactsDiv.appendChild(contactDiv);
    }
}


/**M The function `updateFootnotesVisibility` toggles the visibility of a given element based on the length of selected options. */
function updateFootnotesVisibility(footnotes, selectedOptions) {
    if (footnotes) {
        if (selectedOptions.length > 0) { footnotes.style.visibility = 'hidden'; }
        else { footnotes.style.visibility = 'visible'; }
    }
}


/**M The `editSubtask` function allows users to edit a subtask by replacing the text element with an input field. */
function editSubtask(id) {
    const subtaskElement = document.getElementById(`subtaskText${id}`);
    const editIcon = document.getElementById(`editSubtask${id}`);
    editIcon.src = "assets/img/check.png";
    editIcon.style.height = "18px";
    editIcon.style.width = "auto";
    const currentText = subtaskElement.innerText;
    subtaskElement.outerHTML = `<input type="text" id="subtaskInput${id}" value="${currentText}" onblur="saveSubtask(${id})" onkeypress="handleKeyPress(event, ${id})" />`;
    document.getElementById(`subtaskInput${id}`).focus();
}


/**M The `saveSubtask` function updates the text of a subtask element based on user input and saves the changes. */
function saveSubtask(id) {
    const inputElement = document.getElementById(`subtaskInput${id}`);
    const newText = inputElement.value;
    const liElement = inputElement.closest('li');
    liElement.innerHTML = /*html*/`
        <span id="subtaskText${id}" onclick="editSubtask(${id})">${newText}</span>
        <div class="subImg">
            <img id="editSubtask${id}" src="assets/img/edit.png" onclick="editSubtask(${id})">
            <img src="assets/img/Vector 19.png">
            <img id="deleteSubtask${id}" onclick="deleteSubTask(${id})" src="assets/img/delete.png">
        </div>`;
    subtasks[id].title = newText;
}


/** This function handles key press events. */
function handleKeyPress(event, id) {
    if (event.key === 'Enter') { saveSubtask(id); }
}


/** This function deletes a subtask. */
function deleteSubTask(id) {
    const liElement = document.getElementById(`liSub${id}`);
    liElement.parentNode.removeChild(liElement);
    subtasks.splice(id, 1);
    updateSubtaskElements();
}


/** This funktion updates the subtasks after a deletion. */
function updateSubtaskElements() {
    const subTasksContainer = document.getElementById('addedSubTasks');
    subTasksContainer.innerHTML = '';
    subtasks.forEach((subtask, index) => {
        const newSubTaskHTML = /*html*/`
            <li id="liSub${index}" class="liSub">
                <span id="subtaskText${index}">${subtask.title}</span>
                <div class="subImg">
                    <img id="editSubtask${index}" src="assets/img/edit.png" onclick="editSubtask(${index})">
                    <img src="assets/img/Vector 19.png">
                    <img id="deleteSubtask${index}" src="assets/img/delete.png" onclick="deleteSubTask(${index})">
                </div>
            </li>`;
        subTasksContainer.insertAdjacentHTML('beforeend', newSubTaskHTML);
    });
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
            <img src="img/icon/checkbox.svg" alt="Checkbox">
        </option>`
}


/**M The function `getSelectedAssigned` retrieves the selected contacts from a dropdown menu and displays them with their initials in a separate div. */
function getSelectedAssigned() {
    const checkboxes = document.querySelectorAll('#dropdownMenu input[type="checkbox"]:checked');
    const selectedOptions = Array.from(checkboxes).map(checkbox => checkbox.value);
    const selectedContactsDiv = document.getElementById('selectedContacts');
    selectedContactsDiv.innerHTML = '';
    selectedOptions.forEach(name => { getSelectedAssignedAttributes(selectedContactsDiv, name); });
    return selectedOptions;
}


/**M The function `getSelectedAssignedAttributes` creates a new div element with contact information and appends it to a specified div. */
function getSelectedAssignedAttributes(selectedContactsDiv, name) {
    const contact = addTaskContacts.find(contact => contact.name === name);
    const contactDiv = document.createElement('div');
    const initialsDiv = document.createElement('div');
    initialsDiv.className = 'contact-initials';
    initialsDiv.style.backgroundColor = contact.color;
    initialsDiv.innerText = getInitials(contact.name);
    contactDiv.appendChild(initialsDiv);
    contactDiv.appendChild(document.createTextNode(contact.name));
    selectedContactsDiv.appendChild(contactDiv);
}


/** The function `loadTasks` asynchronously loads tasks from local storage and parses them as JSON. */
async function loadTasks() {
    const loadedTasks = await getItem('tasks');
    tasks = JSON.parse(loadedTasks);
    if (
        tasks.tasksToDo.length === 0 &&
        tasks.tasksInProgress.length === 0 &&
        tasks.tasksAwaitFeedback.length === 0 &&
        tasks.tasksDone.length === 0
    ) { await setDefaultTasks(); }
}


/**M The function `toggleDropdown` toggles the visibility of a dropdown menu by adding or removing the 'show' class. */
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) { dropdownMenu.classList.toggle('show'); }
}


/** The `addedTaskAnimation` function removes the 'd-none' class from an element with the id 'taskAdded' to display it, and then calls the `redirectBoard` function after a delay of 1000 milliseconds. */
function addedTaskAnimation() {
    document.getElementById('taskAdded').classList.remove('d-none');
    setTimeout(window.location.href = "board.html", 1000);
}