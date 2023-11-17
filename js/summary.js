function includeHTML() {
  /* nur aktuell hier später mit in script.js*/
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
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
  countTodos(todos);
  document.getElementById("todoCount").innerHTML = todoCounts.toDoStatus;
  document.getElementById("doneCount").innerHTML = todoCounts.doneStatus;
  document.getElementById("progressCount").innerHTML =
    todoCounts.inProgressStatus;
  document.getElementById("feedbackCount").innerHTML =
    todoCounts.awaitFeedbackStatus;

  document.getElementById("urgentCount").innerHTML = todoCounts.urgentPriority;
  document.getElementById("nextUrgentDate").innerHTML =
    todoCounts.closestDueDateForUrgent;

  document.getElementById("totalCount").innerHTML = todos.length;
}

function countTodos(todos) {
  todos.forEach((todo) => {
    // Count todos for each status
    todoCounts[todo.status]++;

    // Count todos with priority "Urgent"
    if (todo.prio === "Urgent") {
      todoCounts.urgentPriority++;
    }

    if (
      todo.prio === "Urgent" &&
      (!todoCounts.closestDueDateForUrgent ||
        (new Date(todo.dueDate) >= currentDate &&
          new Date(todo.dueDate) <
            new Date(todoCounts.closestDueDateForUrgent)))
    ) {
      todoCounts.closestDueDateForUrgent = formatDate(todo.dueDate);
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
