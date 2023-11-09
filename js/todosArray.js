let todos = [
  {
    id: 0,
    status: "toDo",
    title: "Kochwelt Page & Recipe Redommender",
    description: "Build start page with recipe recommendation.",
    assigned: [
      {
        firstName: "Emmanuel",
        lastName: "Mauer",
        userId: 0,
        userColor: "#1FD7C1",
      },
      {
        firstName: "Marcel",
        lastName: "Bauer",
        userId: 1,
        userColor: "#462F8A",
      },
      {
        firstName: "Anton",
        lastName: "Mayer",
        userId: 0,
        userColor: "#0038FF",
      },
    ],
    dueDate: "10/05/2023",
    prio: "Low",
    category: "User Story",
    subtasks: [
      {
        taskDescription: "Implement Recipe Recommendation",
        isDone: false,
      },
      {
        taskDescription: "Start Page Layout",
        isDone: false,
      },
    ],
  },
  {
    id: 1,
    status: "done",
    title: "todo1",
    description: "Build start page with recipe recommendation.",
    assigned: [],
    dueDate: "10/05/2023",
    prio: "Medium",
    category: "Technical Task",
    subtasks: [
      {
        taskDescription: "Implement Recipe Recommendation",
        isDone: true,
      },
      {
        taskDescription: "Start Page Layout",
        isDone: true,
      },
    ],
  },
  {
    id: 2,
    status: "inProgress",
    title: "todo2",
    description: "Build start page with recipe recommendation.",
    assigned: [
      {
        firstName: "kläger",
        lastName: "maus",
        userId: 0,
        userColor: "black",
      },
      {
        firstName: "Marcel",
        lastName: "Bauer",
        userId: 1,
        userColor: "#462F6A",
      },
      {
        firstName: "Önton",
        lastName: "Mayer",
        userId: 0,
        userColor: "red",
      },
    ],
    dueDate: "10/05/2023",
    prio: "Urgent",
    category: "User Story",
    subtasks: [],
  },
  {
    id: 3,
    status: "done",
    title: "todo1",
    description: "Build start page with recipe recommendation.",
    assigned: [],
    dueDate: "10/05/2023",
    prio: "Medium",
    category: "Technical Task",
    subtasks: [
      {
        taskDescription: "Implement Recipe Recommendation",
        isDone: true,
      },
      {
        taskDescription: "Start Page Layout",
        isDone: false,
      },
      {
        taskDescription: "Start Page Layout",
        isDone: true,
      },
      {
        taskDescription: "Start Page Layout",
        isDone: true,
      },
    ],
  },
];
