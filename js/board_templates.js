/**
 * return the html for the Selected Task Object
 * 
 * @param {object} element - Selected Task Object
 * @returns  string with the html
 */
function generateTodoHTML(element) {
    return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${element["id"]})"  onclick="openToDo(${element["id"]})" class="todo" id="todo${element["id"]}">
    <div class="toDoCategory" id="toDoCategory${element["id"]}" >  ${element["category"]}</div>
  
    <div>
    <div class="toDoTitle"> ${element["title"]} </div>
    <div class="toDoDescription" id="toDoDescription${element["id"]}"></div>
    </div>
  
    <div class="toDoSubtasks" id="toDoSubtasks${element["id"]}"> 
      <div class="toDoSubtasksProgress">
          <div id="toDoSubtasksProgressFiller${element["id"]}" class="toDoSubtasksProgressFiller"></div>
      </div> 
      <div class="toDoSubtasksCount"> <div id="toDoSubtasksDone${element["id"]}"></div>/${element["subtasks"].length} Subtask</div> 
  </div>
  
    <div class="toDoBottom">
    <div class="toDoAssignedContainer" id="toDoAssigned${element["id"]}"></div>
    <div class="toDoPrio" id="toDoPrio${element["id"]}"></div>
    </div>
    
    </div>`;
}

/**
 * return the html when the selected taks is display in the overlay with all informations 
 * 
 * @param {object} todo - Selected Task form the Tasks array
 * @param {number} id - Id of the Selected Task
 * @returns string with the html
 */
function generateToDoOpenHTML(todo, id) {
    return   /*html*/ `
  <div id="toDoOpenBg" onclick="closeToDo()">
      <div id="toDoOpen" class="toDoOpen" onclick="event.stopPropagation()">
          <div class="toDoOpenHeader">
      <div class="toDoOpenCategory" id="toDoOpenCategory${id}" >  ${todo["category"]}</div>
      <div onclick="closeToDo()">      
          <img class="closeToDo" src="./img/closeToDo.svg" alt="">
      </div>
      </div>
      <div class="toDoOpenTitle" >  ${todo["title"]}</div>
      <div class="toDoOpenDescription" >  ${todo["description"]}</div>
      <div class="toDoOpenDate"><div class="toDoOpenSection">Due date:</div><div id="toDoOpenDate${id}"></div></div>
      <div class="toDoOpenPrio" id="" ><div class="toDoOpenSection">Priority:</div> <div class="toDoOpenPrioText">${todo["prio"]}</div>  <div class="toDoOpenPrioIcon" id="toDoOpenPrio${id}"></div> </div>
    
          <div class="toDoOpenAssignedContainer">
      <div class="toDoOpenSection">Assigned To:</div>
      <div class="toDoOpenAssigned" id="toDoOpenAssigned${id}"></div>
      </div>
       
 
      <div class="toDoOpenSubtasksContainer" >
      <div class="toDoOpenSection">Subtasks</div>
      <div class="toDoOpenSubtasks" id="toDoOpenSubtasks${id}"></div> 
      </div> 
      <div class="todoFooter">

<div onclick="deletToDo(${id})" class="deleteToDo"><img class="deleteToDoImg" src="./img/deleteToDo.svg" alt=""><div>Delete</div></div>
<div class="todoFooterSeparator"></div>
<div onclick="editToDo(${id})" class="editToDo">  <img class="editToDoImg" src="./img/editToDo.svg" alt=""><div>Edit</div></div>
      </div>

      </div>
  </div>
`;
}
/**
 * return the html for the initials of the selected user
 * 
 * @param {string} color - color code
 * @param {string} firstLetter - first letter of firstName
 * @param {string} secoundLetter - first letter of lastName
 * @param {string} firstName - first name of the user
 * @param {string} lastName - last name of the user
 * @param {boolean} isYou - true if the selected user is loged in
 * @returns string with the html
 */
function generateAssignedHTML(color, firstLetter, secoundLetter, firstName, lastName, isYou) {
    return   /*html*/ `
  <div class="toDoOpenUserAssigned">
    <div class="toDoOpenCircleAssigned" style="background-color:${color}"> ${firstLetter}${secoundLetter} </div>
    <div class="toDoOpenNameAssigned">${firstName} ${lastName} ${isYou}</div>
    </div>`;
}
/**
 * return the html for the subtask of the selected task
 * 
 * @param {number} i - current Number of the subtask
 * @param {boolean} isChecked - status of the subtatsk 
 * @param {number} id - Id of the Selected Task
 * @param {string} description - description of the subtask
 * @returns string with the html
 */
function generateSubtaskHTML(i, isChecked, id, description) {
    return /*html*/ `
  <label class="customCheckbox">
      <input type="checkbox" id="taskCheckbox${i}" ${isChecked} onclick="updateSubtask(${id}, ${i})">
      <span class="customCheckmark">
          <svg class="uncheckedSvg" viewBox="0 0 21 16">
              <use href="assets/img/icons.svg#checkbox-unchecked"></use>
          </svg>
          <svg class="checkedSvg" viewBox="0 0 21 16">
              <use href="assets/img/icons.svg#checkbox-checked"></use>
          </svg>
      </span>
${description}
  </label>
`;
}

/**
 * retun the html of the edit page for the selected Taks
 * 
 * @param {number} id - Id of the Selected Task
 * @returns - string with the html
 */
function generateEditToDoHtml(id) {
    return   /*html*/ `
<img onclick="closeToDo()" class="closeToDo closeToDoEdit" src="./img/closeToDo.svg" alt="">
<div class="editToDoDiv">
<form id="editFrom" onsubmit="saveEdit('${id}'); return false">
<div class="task-input-container">
              <label class="task-form-label" for="title">
                  Title
              </label>
              <input class="task-form-input" type="text" name="title" id="title" placeholder="Enter a title"
                  required>
              <label class="task-form-label" for="description">Description</label>
              <div class="task-form-text-wrapper">
                  <textarea class="task-form-text" name="text" id="description" placeholder="Enter a Description"
                  
                ></textarea>
                  <svg class="task-form-resize-icon"><use href="assets/img/icons.svg#resize-icon"></use></svg>
              </div>
              <label class="task-form-label" for="date">
                  Due date
              </label>
              <input class="task-form-date" type="date" name="date" id="date" max="2025-12-31" required>
              
              <label class="task-form-label" for="assign">Assigned to</label>
              <div class="task-dropdown-container">
                  <span id="arrow-assign" class="task-arrow-dropdown">
                      <svg viewBox="0 0 8 5">
                          <use href="assets/img/icons.svg#arrow-icon"></use>
                      </svg>
                  </span>
                  <input class="task-assign" id="assign" type="text" name="assign"
                      placeholder="Select contacts to assign">
                  <div id="assign-content" class="assign-content d-none">
                      <div class="assign-overlay" id="assign-overlay" onclick="closeAssignDropdown()"></div>
                      <div class="assign-dropdown-menu" id="assign-dropdown-menu"></div>
                      <div class="assign-button-container" id="assign-button-container"></div>
                  </div>
                  <div id="initials-content"></div>
              </div>
        
              <div class="task-form-label">Prio</div>
              <div class="task-form-prio editPrioMobile">
                  <div class="task-form-btn" id="urgent-btn" onclick="selectPrioButton('urgent-btn'); changePrio('Urgent')">Urgent
                      <svg class="task-form-urgent-icon" viewBox="0 0 21 16">
                          <use href="assets/img/icons.svg#urgentprio-icon"></use>
                      </svg>
                  </div>
                  <div class="task-form-btn" id="medium-btn" onclick="selectPrioButton('medium-btn'); changePrio('Medium')">Medium
                      <svg class="task-form-medium-icon" viewBox="0 0 21 8">
                          <use href="assets/img/icons.svg#mediumprio-icon"></use>
                      </svg>
                  </div>
                  <div class="task-form-btn" id="low-btn" onclick="selectPrioButton('low-btn'); changePrio('Low')">Low
                      <svg class="task-form-low-icon" viewBox="0 0 21 16">
                          <use href="assets/img/icons.svg#lowprio-icon"></use>
                      </svg>
                  </div>
              </div>
              <label class="task-form-label" for="subtasks">Subtasks</label>
              <div class="task-form-subtasks" id="subtasks-container">
                  <input class="task-form-input m-b05" type="text" name="subtasks" id="subtasks"
                      placeholder="Add new subtask">
                  <div onclick="addSubtaskEdit()">
                      <svg class="task-form-add-icon" id="task-add-icon" viewBox="0 0 15 14">
                          <use href="assets/img/icons.svg#add-icon"></use>
                      </svg>
                  </div>
              </div>
</div>
</div>
</form>
<button type="submit" class="savedEdit" form="editFrom">
Ok
<img src="img/saveEditBoard.svg" alt="">
</button>
`;
}

/**
 * return html of the task overlay with the newly edit informations
 * 
 * @param {number} id - Id of the Selected Task
 * @param {object} todo - Selected Task form the Tasks array
 * @returns - string with the html
 */
function generateShowEditHTML(id, todo) {
    return   /*html*/ `
  <div class="toDoOpenHeader">
           <div class="toDoOpenCategory" id="toDoOpenCategory${id}" >  ${todo["category"]}</div>
           <div onclick="closeToDo()">      
               <img class="closeToDo" src="./img/closeToDo.svg" alt="">
           </div>
           </div>
           <div class="toDoOpenTitle" >  ${todo["title"]}</div>
           <div class="toDoOpenDescription" >  ${todo["description"]}</div>
           <div class="toDoOpenDate"><div class="toDoOpenSection">Due date:</div><div id="toDoOpenDate${id}"></div></div>
           <div class="toDoOpenPrio" id="" ><div class="toDoOpenSection">Priority:</div> <div class="toDoOpenPrioText">${todo["prio"]}</div>  <div class="toDoOpenPrioIcon" id="toDoOpenPrio${id}"></div> </div>
         
               <div class="toDoOpenAssignedContainer">
           <div class="toDoOpenSection">Assigned To:</div>
           <div class="toDoOpenAssigned" id="toDoOpenAssigned${id}"></div>
      
           </div>
            
      
           <div class="toDoOpenSubtasksContainer" >
           <div class="toDoOpenSection">Subtasks</div>
           <div class="toDoOpenSubtasks" id="toDoOpenSubtasks${id}"></div> 
           </div> 
           <div class="todoFooter">

   <div onclick="deletToDo(${id})" class="deleteToDo"><img class="deleteToDoImg" src="./img/deleteToDo.svg" alt=""><div>Delete</div></div>
   <div class="todoFooterSeparator"></div>
   <div onclick="editToDo(${id})" class="editToDo">  <img class="editToDoImg" src="./img/editToDo.svg" alt=""><div>Edit</div></div>
           </div>`;
}

/**
 * return html for edeting the subtask
 * 
 * @param {string} subtaskField - stands for the value of the input
 * @param {number} index - stands for the index of the current subtask
 * @returns - string with html
 */
function editSubtaskHTML(subtaskField, index) {
    return /*html*/ `
      <div class="subtask-item" id="subtask-item${index}">
          <div class="subtask-info">
              <span></span>
              <span class="subtask-input" id="subtask-input${index}">${subtaskField}</span>
          </div>
          <div class="subtask-icon-container" id="subtask-icons${index}">
              <div onclick="editTextSubtask(${index})">
                  <svg class="subtask-edit-icon"><use href="assets/img/icons.svg#edit-icon"></use></svg>
              </div>
              <span class="subtask-separator"></span>
              <div onclick="editdeleteSubtask(${index})">
                  <svg class="subtask-delete-icon"><use href="assets/img/icons.svg#delete-icon"></use></svg>
              </div>
          </div>
      </div>
  `;
}
/**
 * retun html of the add a new task overlay
 * 
 * @param {string} statusTask - status if the taks which will be added
 * @returns - string with html
 */
function generateAddTaskHTML(statusTask) {
    return   /*html*/ `
  <div id="addTaskOpenBg" onclick="closeAddTask()">

      <div id="addTaskOpen" class="addTaskOpen" onclick="event.stopPropagation()"> 
        <div class="addTaskOpenHead">
        <h1 class="task-heading-h1">Add Task</h1>

<div onclick="closeAddTask()">      
          <img class="closeToDo" src="./img/closeToDo.svg" alt="">
      </div>
        </div>
    

            <div class="task-form-container">
                <form class="task-form" onsubmit="addTaskBoard('${statusTask}'); return false" autocomplete="off">
                    <div class="task-form-subcontainer">
                        <div class="task-input-container">
                            <label class="task-form-label" for="title">
                                Title<svg class="task-form-star" viewBox="0 0 16 16">
                                    <use href="assets/img/icons.svg#star-icon"></use>
                                </svg>
                            </label>
                            <input class="task-form-input" type="text" name="title" id="title"
                                placeholder="Enter a title" required>
                            <label class="task-form-label" for="description">Description</label>
                            <div class="task-form-text-wrapper">
                                <textarea class="task-form-text" name="text" id="description"
                                    placeholder="Enter a Description"></textarea>
                                <svg class="task-form-resize-icon">
                                    <use href="assets/img/icons.svg#resize-icon"></use>
                                </svg>
                            </div>

                            <label class="task-form-label" for="assign">Assigned to</label>
                            <div class="task-dropdown-container">
                                <span id="arrow-assign" class="task-arrow-dropdown">
                                    <svg viewBox="0 0 8 5">
                                        <use href="assets/img/icons.svg#arrow-icon"></use>
                                    </svg>
                                </span>
                                <input class="task-assign" id="assign" type="text" name="assign"
                                    placeholder="Select contacts to assign">
                                <div id="assign-content" class="assign-content d-none">
                                    <div class="assign-overlay" id="assign-overlay" onclick="closeAssignDropdown()"></div>
                                    <div class="assign-dropdown-menu" id="assign-dropdown-menu"></div>
                                    <div class="assign-button-container" id="assign-button-container"></div>
                                </div>
                                <div id="initials-content"></div>
                            </div>

                        </div>
                        <div class="task-input-container">
                            <label class="task-form-label" for="date">
                                Due date<svg class="task-form-star" viewBox="0 0 16 16">
                                    <use href="assets/img/icons.svg#star-icon"></use>
                                </svg>
                            </label>
                            <input class="task-form-date" type="date" name="date" id="date" max="2025-12-31" required>
                            <div class="task-form-label">Prio</div>
                            <div class="task-form-prio">
                                <div class="task-form-btn" id="urgent-btn" onclick="selectPrioButton('urgent-btn'); setAddTaskPrio('Urgent')">
                                    Urgent
                                    <svg class="task-form-urgent-icon" viewBox="0 0 21 16">
                                        <use href="assets/img/icons.svg#urgentprio-icon"></use>
                                    </svg>
                                </div>
                                <div class="task-form-btn" id="medium-btn" onclick="selectPrioButton('medium-btn'); setAddTaskPrio('Medium')">
                                    Medium
                                    <svg class="task-form-medium-icon" viewBox="0 0 21 8">
                                        <use href="assets/img/icons.svg#mediumprio-icon"></use>
                                    </svg>
                                </div>
                                <div class="task-form-btn" id="low-btn" onclick="selectPrioButton('low-btn'); setAddTaskPrio('Low')">
                                    Low
                                    <svg class="task-form-low-icon" viewBox="0 0 21 16">
                                        <use href="assets/img/icons.svg#lowprio-icon"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="task-form-label">
                                Category<svg class="task-form-star" viewBox="0 0 16 16">
                                    <use href="assets/img/icons.svg#star-icon"></use>
                                </svg>
                            </div>
                            <div class="task-dropdown-container">
                                <span id="arrow-category" class="task-arrow-dropdown"
                                    onclick="toggleCategoryDropdown()">
                                    <svg viewBox="0 0 8 5">
                                        <use href="assets/img/icons.svg#arrow-icon"></use>
                                    </svg>
                                </span>
                                <input class="task-category" id="category" placeholder="Select task category" type="text"
                                    onkeydown="return false;" required onclick="toggleCategoryDropdown()">
                                <div id="category-content"></div>
                            </div>
                            <label class="task-form-label" for="subtasks">Subtasks</label>
                            <div class="task-form-subtasks">
                                <input class="task-form-input m-b05" type="text" name="subtasks" id="subtasks"
                                    placeholder="Add new subtask">
                                <div onclick="addSubtaskEdit()">
                                    <svg class="task-form-add-icon" id="task-add-icon" viewBox="0 0 15 14">
                                        <use href="assets/img/icons.svg#add-icon"></use>
                                    </svg>
                                </div>
                                <div id="subtasks-container"></div>
                            </div>
                        </div>
                    </div>
                    <div class="task-submit-container">
                        <div class="task-required-text">
                            <svg class="task-form-star" viewBox="0 0 16 16">
                                <use href="assets/img/icons.svg#star-icon"></use>
                            </svg>This field is required
                        </div>
                        <div class="task-submit-buttons">
                            <button class="task-clear-button" type="reset" onclick="closeAddTask()">Cancel
                                <svg class="task-clear-icon">
                                    <use href="assets/img/icons.svg#x-icon"></use>
                                </svg>
                            </button>
                            <button class="main-button" type="submit" id="create-task">Create Task
                                <svg class="task-create-icon">
                                    <use href="assets/img/icons.svg#check-icon"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
<div class="taskAddedContainer d-none" id="taskAddedContainer"> 
  <div class="taskAdded">
    <span>Task added to board</span>
    <img class="board-icon" src="img/board-icon.svg" alt="Board icon">
  </div>
</div>
        </div>


`;
}

/**
 * return html for the selcted prio
 * 
 * @param {object} priorityObj - Object with all 3 possible prios
 * @param {string} priority - prio of selected Task
 * @returns - string with html
 */
function generateprioHTML(priorityObj, priority) {
    return     /*html*/ `
  <svg class="${priorityObj[priority]}" viewBox="0 0 21 ${priority === "Medium" ? 8 : 16}">
    <use href="assets/img/icons.svg#${priority.toLowerCase()}prio-icon"></use>
  </svg>`;
}

/**
 * return html of the assigned user initials
 * 
 * @param {string} color - color code
 * @param {string} firstLetter - first letter of firstName
 * @param {string} secoundLetter - first letter of lastName
 * @returns - string with html
 */
function generateAssignedUserHTML(firstLetter, secondLetter, color) {
    return /*html*/ `
    <div class="toDoAssigned" style="background-color:${color}">${firstLetter}${secondLetter}</div>`;
}

/**
 * return html of the assigned useres
 * 
 * @param {number} moreAssigned - number of 
 * @returns - string with html
 */
function generateMoreAssignedHTML(moreAssigned) {
    return /*html*/ `
    <div class="toDoAssignedMore">+${moreAssigned}</div>`;
}