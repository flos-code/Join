/**
 * Setting all required arrays
 */
tasks = [];
users = [];

/**
 * Downloading files vom backend server, and run first functions
 */
async function initSummary() {
  await includeHTML();
  await loadData();
  renderSummaryConten();
}

/**
 * fetch users and tasks data from server to global variables
 */
 async function loadData() {
  try {
      tasks = JSON.parse(await getItem('tasks'));
      users = JSON.parse(await getItem('users'));
  } catch(e) {
      console.error('Loading Data error:', e);
  }
}

/**
 * Setting all required varibles 
 */
let todoCounts = {
  toDoStatus: 0,
  inProgressStatus: 0,
  doneStatus: 0,
  awaitFeedbackStatus: 0,
  urgentPriority: 0,
  closestDueDateForUrgent: null,
};

let currentDate = new Date();
let currentTime = new Date().getHours();

/**
 * This function calls three other functions in sequence: `loadCount`, `timedGreeting` and `greetUser`
 */
function renderSummaryConten() {
  loadeCount();
  timedGreeting();
  greetUser();
}

/**
 * Insert all values for the html part
 */
function loadeCount() {
  countTodos(tasks);
  document.getElementById("todoCount").innerHTML = todoCounts.toDoStatus;
  document.getElementById("doneCount").innerHTML = todoCounts.doneStatus;
  document.getElementById("progressCount").innerHTML =
    todoCounts.inProgressStatus;
  document.getElementById("feedbackCount").innerHTML =
    todoCounts.awaitFeedbackStatus;
  document.getElementById("urgentCount").innerHTML = todoCounts.urgentPriority;
  document.getElementById("nextUrgentDate").innerHTML =
    todoCounts.closestDueDateForUrgent;
  document.getElementById("totalCount").innerHTML = tasks.length;
}

/**
* If the urgency from the task is 'urgent', let all urgent-elements shown.
* Find 'Urgent' in the array Tasks and filter all entries with 'low' and medium away.
* The aim is that only entries with the urgency 'urgent' are displayed.
*/
function countTodos(tasks) {
  tasks.forEach((task) => {
    todoCounts[task.status]++;
    if (task.prio === "Urgent") {
      todoCounts.urgentPriority++;
    }

    setNextUrgentDate(task, todoCounts)
    updateDeadlineText(todoCounts.urgentPriority)
  });
}

/**
 * Formating the date
 */
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

/**
 * Change greeting at summary depending on the time of day
 */
function timedGreeting() {
  let greeting;

  if (currentTime >= 5 && currentTime < 12) {
    greeting = "Good morning,";
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Good afternoon,";
  } else if (currentTime >= 18 && currentTime < 22) {
    greeting = "Good evening,";
  } else {
    greeting = "Good night,";
  }

  document.getElementById("timedGreeting").innerHTML = greeting;
  document.getElementById("mobileTimedGreeting").innerHTML = greeting;
}

/**
 * sets the next due date for an urgent task if the priority of the task is Urgent 
 * and the due date is closer to the current date than the already set next due date for urgent tasks.
 * */
function setNextUrgentDate(task, todoCounts) {
  if (
    task.prio === "Urgent" &&
    (!todoCounts.closestDueDateForUrgent ||
      (new Date(task.dueDate) >= currentDate &&
        new Date(task.dueDate) <
        new Date(todoCounts.closestDueDateForUrgent)))
  ) {
    return todoCounts.closestDueDateForUrgent = formatDate(task.dueDate);
  }
}

/**
 * Sets upcoming/no upcoming deadline
 */
function updateDeadlineText(UrgentTasksCount) {
  if (UrgentTasksCount > 0) {
    document.getElementById("nextUrgentDateText").innerHTML =
      "Upcoming Deadline";
  } else {
    document.getElementById("nextUrgentDateText").innerHTML =
      "No Upcoming Deadline";
  }
}

/**
 * shows a popup to greet the user in mobile view
 */
document.addEventListener("DOMContentLoaded", function () {
  let mobileGreetDiv = document.getElementById("mobileGreet");
  let mainContent = document.getElementById("summaryContent");
  let isMobileView = window.matchMedia("(max-width: 767.98px)").matches;
  if (isMobileView) {
    mainContent.style.display = "none";
    mobileGreetDiv.classList.add("show");
    setTimeout(function () {
      mainContent.style.display = "flex";
      mobileGreetDiv.classList.add("hidden");
    }, 700);
    setTimeout(function () {
      mobileGreetDiv.style.display = "none";
    }, 1700);
  }
});

/**
 * Function to show user/quest-login-name 
 */
function greetUser() {
  for (let i = 0; i < users.length; i++) {
    let user = users[i]
    if (user["isYou"]) {
      document.getElementById("logedinUser").innerHTML = `${user["firstName"]} ${user["lastName"]}`
      document.getElementById("mobileLogedinUser").innerHTML = `${user["firstName"]} ${user["lastName"]}`
    }
    else {
      document.getElementById("logedinUser").innerHTML = `Guest`
      document.getElementById("mobileLogedinUser").innerHTML = `Guest`
    }

  }
}