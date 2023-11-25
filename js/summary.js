tasks = [];

async function initSummary() {
  await includeHTML();
  await loadTasks();
  renderSummaryConten();
}


async function loadTasks() {
  try {
      tasks = JSON.parse(await getItem('tasks'));
  } catch(e) {
      console.error('Loading Tasks error:', e);
  }
}

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

function renderSummaryConten() {
  loadeCount();
  timedGreeting();
}

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

function countTodos(tasks) {
  tasks.forEach((task) => {
    // Count todos for each status
    todoCounts[task.status]++;

    // Count todos with priority "Urgent"
    if (task.prio === "Urgent") {
      todoCounts.urgentPriority++;
    }

    if (
      task.prio === "Urgent" &&
      (!todoCounts.closestDueDateForUrgent ||
        (new Date(task.dueDate) >= currentDate &&
          new Date(task.dueDate) <
            new Date(todoCounts.closestDueDateForUrgent)))
    ) {
      todoCounts.closestDueDateForUrgent = formatDate(task.dueDate);
    }

    if (todoCounts.urgentPriority > 0) {
      document.getElementById("nextUrgentDateText").innerHTML =
        "Upcoming Deadline";
    } else {
      document.getElementById("nextUrgentDateText").innerHTML =
        "No Upcoming Deadline";
    }
  });
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

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
}
