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
        isYou: true /*is logged in */,
      },
      {
        firstName: "Marcel",
        lastName: "Bauer",
        userId: 1,
        userColor: "#462F8A",
        isYou: false,
      },
      {
        firstName: "Anton",
        lastName: "Mayer",
        userId: 0,
        userColor: "#0038FF",
        isYou: false,
      },
    ],
    dueDate: "2023-09-23" /*1700438400*/,
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
    title: "todo1 id1",
    description:
      "Build start page with recipe recommendation. this is very long  Hund way to long to be displayed",
    assigned: [],
    dueDate: "1699138800",
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
    title: "todo2 id2",
    description: "Build start page with recipe recommendation.",
    assigned: [
      {
        firstName: "kläger",
        lastName: "maus",
        userId: 0,
        userColor: "black",
        isYou: false,
      },
      {
        firstName: "Marcel",
        lastName: "Bauer",
        userId: 1,
        userColor: "#462F6A",
        isYou: false,
      },
      {
        firstName: "Önton",
        lastName: "Mayer",
        userId: 0,
        userColor: "red",
        isYou: false,
      },
      {
        firstName: "kläger",
        lastName: "maus",
        userId: 0,
        userColor: "black",
        isYou: false,
      },
      {
        firstName: "Marcel",
        lastName: "Bauer",
        userId: 1,
        userColor: "#462F6A",
        isYou: false,
      },
      {
        firstName: "Önton",
        lastName: "Mayer",
        userId: 0,
        userColor: "red",
        isYou: false,
      },
      {
        firstName: "kläger",
        lastName: "maus",
        userId: 0,
        userColor: "black",
        isYou: false,
      },
      {
        firstName: "kläger",
        lastName: "maus",
        userId: 0,
        userColor: "black",
        isYou: false,
      },
      {
        firstName: "kläger",
        lastName: "maus",
        userId: 0,
        userColor: "black",
        isYou: false,
      },
      {
        firstName: "kläger",
        lastName: "maus",
        userId: 0,
        userColor: "black",
        isYou: false,
      },
    ],
    dueDate: "1700460000",
    prio: "Urgent",
    category: "User Story",
    subtasks: [],
  },
  {
    id: 3,
    status: "done",
    title: "todo1 id3",
    description: "Build start page with recipe recommendation.",
    assigned: [],
    dueDate: "1700434800",
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
