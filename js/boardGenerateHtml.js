/*** The function `generateTaskHtml` generates HTML code for displaying a task based on the task type, index `i`, and index `j`. */
function generateTaskHtml(taskType, i, j) {
    const taskTypeString = taskTypesKeys[i];
    return /*html*/`
    <div class="task d-flex justify-content-center flex-column" draggable="true" ondragstart="startDragging(${i}, ${j})" ontouchstart="startTouchDragging(event, ${i}, ${j})" onclick="showTaskOverlay('${taskTypeString}', ${i}, ${j});">
        <div class="taskCategory d-flex align-items-center" id="${taskTypeString}Category${j}">${taskType[j].category}</div>
        <p class="taskTitle text-break">${taskType[j].title}</p>
        <p class="taskDescription text-break">${taskType[j].description}</p>
        <div class="d-flex gap-3 align-items-baseline">
            <div id="${taskTypeString}Progress${j}" style="width: 128px;"></div>
            <p class="m-0 progressText" id="${taskTypeString}ProgressText${j}"></p>
        </div>
        <div class="d-flex justify-content-between">
            <div id="${taskTypeString}Assigned${j}" class="d-flex"></div>
            <div class="iconBox32">
                <img src="img/icon/priority${taskType[j].priority}.svg" alt="Priority">
            </div>
        </div>
    </div>
    `;
}


/** The function `generateNoTasksHtml` returns HTML code for displaying a message when there are no tasks to do. */
function generateNoTasksHtml() {
    return /*html*/`
        <div class="emptyTask d-flex justify-content-center align-items-center">
            <p>No tasks To do</p>
        </div>
    `
}


/** The function `generateTaskOverlayHtml` returns HTML markup for displaying task details based on the task type, index `i`, and index `j`. */
function generateTaskOverlayHtml(taskType, i, j) {
    const task = taskType[j];
    return /*html*/`
        <div class="taskOverlay d-flex justify-content-center flex-column mb-3">
            <div class="d-flex justify-content-between align-items-center titleOfOverlay">
                <div class="taskOverlayCategory" id="taskOverlayCategory">${task.category}</div>
                <img src="img/icon/cross.svg" alt="Cross" onclick="hideTaskOverlay()" class="closeIcon">
            </div>    
            <p class="taskOverlayTitle text-break">${task.title}</p>
            <p class="taskOverlayDescription text-break">${task.description}</p>
            <div class="d-flex gap-3">
                <p class="taskOverlayTextGray">Due date:</p>
                <p class="taskOverlayDate">${task.date}</p>
            </div>
            <div class="d-flex gap-4">
                <p class="taskOverlayTextGray">Priority:</p>
                <div class="d-flex">
                    <p>${task.priority}</p>
                    <div class="iconBox32">
                        <img src="img/icon/priority${task.priority}.svg" alt="Priority">
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column">
                <p class="taskOverlayTextGray">Assigned to:</p>
            </div>
            <div id="selectedContacts" class="selectedContacts"></div>
            <div class="assignedContactsContainer d-flex justify-content-between">
                <div id="taskOverlayAssigned" class="d-flex"></div>
            </div>
            <div>
                <p class="taskOverlayTextGray d-none mb-2" id="taskOverlaySubtasksTitle">Subtasks</p>
                <div id="taskOverlaySubtasks"></div>
            </div>
            <div class="overlaytasksBtns">
                <button class="overlayDelete" onclick="deleteTask()">Delete  <img class="overlayDeleteImg" src="assets/img/delete.png"></button>
                <img src="assets/img/Vector 3.png">
                <button class="overlayEdit" onclick="editTask(); selectedTask(${i}, ${j});" id="editTaskButton">Edit  <img class="overlayEditImg" src="assets/img/edit.png"></button>
            </div>
        </div>
    `;
}


/** This function generates and returns HTML for shown assignees. */
function generateAssigneesToShowHtml(color, assignee) {
    return /*html*/`
        <div class="taskAssigned d-flex justify-content-center align-items-center" style="background-color: ${color};">
        ${getInitials(assignee)}
        </div>
    `
}


/** This function generates and returns HTML for the remaining assignees. */
function generateAssigneesRemainingHtml(remainingAssigneesCount) {
    return /*html*/`
        <div class="taskAssigned d-flex justify-content-center align-items-center" style="background-color: grey;">
            +${remainingAssigneesCount}
        </div>
    `
}