let backupUsers = [
    {
        firstName: 'Jakob',
        lastName: 'Edens',
        initials: 'JE',
        userColor: '#9CBF3F',
        email: 'edens-jakob83@email.com',
        phone: '01701750783',
        password: null,
        isYou: false,
        userID: 0
    },
    {
        firstName: 'Hans',
        lastName: 'Maier',
        initials: 'HM',
        userColor: '#2E3D45',
        email: 'hans.m@mail.de',
        phone: '0174232398',
        password: null,
        isYou: false,
        userID: 1
    },
    {
        firstName: 'Sandra',
        lastName: 'Lerchen',
        initials: 'SL',
        userColor: '#9A9AC6',
        email: 'laute.lereche02@mail.de',
        phone: '023586043',
        password: null,
        isYou: false,
        userID: 2
    },
    {
        firstName: 'Lena',
        lastName: 'Biegman',
        initials: 'LB',
        userColor: '#EA69C3',
        email: 'l.biegman@mail.de',
        phone: '055723350',
        password: null,
        isYou: false,
        userID: 3
    },
    {
        firstName: 'Max',
        lastName: 'Held',
        initials: 'MH',
        userColor: '#049F6A',
        email: 'supermax@mail.com',
        phone: '0382320474',
        password: null,
        isYou: false,
        userID: 4
    },
    {
        firstName: 'Martina',
        lastName: 'Schulz',
        initials: 'MS',
        userColor: '#08AFDB',
        email: 'martina.schulz.84@mail.de',
        phone: '01753524524',
        password: null,
        isYou: false,
        userID: 5
    },
    {
        firstName: 'Ergun',
        lastName: 'Pamuk',
        initials: 'EP',
        userColor: '#E20CB7',
        email: 'e.pamuk95@mail.de',
        phone: '03534552234',
        password: null,
        isYou: false,
        userID: 6
    },
    {
        firstName: 'Orhan',
        lastName: 'Nihat',
        initials: 'ON',
        userColor: '#8AE63F',
        email: 'nihat.orhan23@mail.de',
        phone: '0043543244',
        password: null,
        isYou: false,
        userID: 7
    },
    {
        firstName: 'Sayar',
        lastName: 'Keser',
        initials: 'SK',
        userColor: '#9B0229',
        email: 'sayar-keser@mail.com',
        phone: '0235243434',
        password: null,
        isYou: false,
        userID: 8
    },
    {
        firstName: 'Thanh',
        lastName: 'Hoa',
        initials: 'TH',
        userColor: '#354C5F',
        email: 'hoa.thanh97@mail.de',
        phone: '032232354224',
        password: null,
        isYou: false,
        userID: 9
    },
    {
        firstName: 'Bao',
        lastName: 'Hoang',
        initials: 'BH',
        userColor: '#12B4CB',
        email: 'bao.hoan@mail.de',
        phone: '0234322302',
        password: null,
        isYou: false,
        userID: 10
    },
]

let backupTasks = [
    {
        id: 0,
        title: 'Password Reset',
        description: 'As a registered user, I want to reset my password if I forget it to regain access to my account.',
        category: 'User Story',
        dueDate: '2024-02-03',
        prio: 'Low',
        status: 'toDoStatus',
        assigned: [{
            firstName: 'Hans',
            lastName: 'Maier',
            initials: 'HM',
            userColor: '#2E3D45',
            email: 'hans.m@mail.de',
            phone: '0174232398',
            password: null,
            isYou: false,
            userID: 1
        },
        {
            firstName: 'Sandra',
            lastName: 'Lerchen',
            initials: 'SL',
            userColor: '#9A9AC6',
            email: 'laute.lereche02@mail.de',
            phone: '023586043',
            password: null,
            isYou: false,
            userID: 2
        },
        {
            firstName: 'Thanh',
            lastName: 'Hoa',
            initials: 'TH',
            userColor: '#354C5F',
            email: 'hoa.thanh97@mail.de',
            phone: '032232354224',
            password: null,
            isYou: false,
            userID: 9
        },
        ],
        subtasks: [
            {
                taskDescription: 'Create a \"Forgot Password\" page.',
                isDone: false
            },
            {
                taskDescription: 'Generate and send reset password emails.',
                isDone: false
            },
            {
                taskDescription: 'Implement password reset logic.',
                isDone: false
            },
        ],
    },
    {
        id: 1,
        title: 'Implement User Registration Form',
        description: 'Create a user registration form to capture user information and store it securely.',
        category: 'Technical Task',
        dueDate: '2024-02-02',
        prio: 'Medium',
        status: 'toDoStatus',
        assigned: [],
        subtasks: [],
    },
    {
        id: 2,
        title: 'Account Creation',
        description: 'As a website visitor, I want to be able to create an account so that I can access personalized features.',
        category: 'User Story',
        dueDate: '2024-01-31',
        prio: 'Urgent',
        status: 'inProgressStatus',
        assigned: [
            {
                firstName: 'Jakob',
                lastName: 'Edens',
                initials: 'JE',
                userColor: '#9CBF3F',
                email: 'edens-jakob83@email.com',
                phone: '01701750783',
                password: null,
                isYou: false,
                userID: 0
            },
            {
                firstName: 'Hans',
                lastName: 'Maier',
                initials: 'HM',
                userColor: '#2E3D45',
                email: 'hans.m@mail.de',
                phone: '0174232398',
                password: null,
                isYou: false,
                userID: 1
            },
            {
                firstName: 'Sandra',
                lastName: 'Lerchen',
                initials: 'SL',
                userColor: '#9A9AC6',
                email: 'laute.lereche02@mail.de',
                phone: '023586043',
                password: null,
                isYou: false,
                userID: 2
            },
            {
                firstName: 'Lena',
                lastName: 'Biegman',
                initials: 'LB',
                userColor: '#EA69C3',
                email: 'l.biegman@mail.de',
                phone: '055723350',
                password: null,
                isYou: false,
                userID: 3
            },
            {
                firstName: 'Max',
                lastName: 'Held',
                initials: 'MH',
                userColor: '#049F6A',
                email: 'supermax@mail.com',
                phone: '0382320474',
                password: null,
                isYou: false,
                userID: 4
            },
            {
                firstName: 'Martina',
                lastName: 'Schulz',
                initials: 'MS',
                userColor: '#08AFDB',
                email: 'martina.schulz.84@mail.de',
                phone: '01753524524',
                password: null,
                isYou: false,
                userID: 5
            }
        ],
        subtasks: [
            {
                taskDescription: 'Design the registration form UI.',
                isDone: true
            },
            {
                taskDescription: 'Implement user input validation.',
                isDone: false
            },
            {
                taskDescription: 'Store user data securely in the database.',
                isDone: true
            },
        ],
    },
    {
        id: 3,
        title: 'Implement Password Reset Functionality',
        description: 'Develop the functionality to allow users to reset their passwords securely.',
        category: 'Technical Task',
        dueDate: '2024-04-19',
        prio: 'Low',
        status: 'inProgressStatus',
        assigned: [
            {
                firstName: 'Sayar',
                lastName: 'Keser',
                initials: 'SK',
                userColor: '#9B0229',
                email: 'sayar-keser@mail.com',
                phone: '0235243434',
                password: null,
                isYou: false,
                userID: 8
            },
            {
                firstName: 'Martina',
                lastName: 'Schulz',
                initials: 'MS',
                userColor: '#08AFDB',
                email: 'martina.schulz.84@mail.de',
                phone: '01753524524',
                password: null,
                isYou: false,
                userID: 5
            },
        ],
        subtasks: [],
    },
    {
        id: 4,
        title: 'Retrieve and Display Order Data',
        description: 'Develop the functionality to fetch and display a user\'s order history.',
        category: 'Technical Task',
        dueDate: '2024-02-25',
        prio: 'Urgent',
        status: 'awaitFeedbackStatus',
        assigned: [
            {
                firstName: 'Bao',
                lastName: 'Hoang',
                initials: 'BH',
                userColor: '#12B4CB',
                email: 'bao.hoan@mail.de',
                phone: '0234322302',
                password: null,
                isYou: false,
                userID: 10
            },
        ],
        subtasks: [],
    },
    {
        id: 5,
        title: 'Order History',
        description: 'As a customer, I want to view my order history to keep track of my past purchases.',
        category: 'User Story',
        dueDate: '2024-04-25',
        prio: 'Medium',
        status: 'awaitFeedbackStatus',
        assigned: [
            {
                firstName: 'Thanh',
                lastName: 'Hoa',
                initials: 'TH',
                userColor: '#354C5F',
                email: 'hoa.thanh97@mail.de',
                phone: '032232354224',
                password: null,
                isYou: false,
                userID: 9
            },
            {
                firstName: 'Max',
                lastName: 'Held',
                initials: 'MH',
                userColor: '#049F6A',
                email: 'supermax@mail.com',
                phone: '0382320474',
                password: null,
                isYou: false,
                userID: 4
            },
        ],
        subtasks: [
            {
                taskDescription: 'Design the order history page.',
                isDone: true
            },
            {
                taskDescription: 'Retrieve and display order data.',
                isDone: false
            },

        ],
    },
    {
        id: 6,
        title: 'Design Order History Page',
        description: 'Create the user interface for the order history page.',
        category: 'Technical Task',
        dueDate: '2024-02-04',
        prio: 'Medium',
        status: 'doneStatus',
        assigned: [
            {
                firstName: 'Sayar',
                lastName: 'Keser',
                initials: 'SK',
                userColor: '#9B0229',
                email: 'sayar-keser@mail.com',
                phone: '0235243434',
                password: null,
                isYou: false,
                userID: 8
            },
            {
                firstName: 'Martina',
                lastName: 'Schulz',
                initials: 'MS',
                userColor: '#08AFDB',
                email: 'martina.schulz.84@mail.de',
                phone: '01753524524',
                password: null,
                isYou: false,
                userID: 5
            },
        ],
        subtasks: [],
    },
    {
        id: 7,
        title: 'Responsive Design',
        description: 'As a mobile user, I want the website to be responsive to ensure a seamless experience on various devices.',
        category: 'User Story',
        dueDate: '2024-03-31',
        prio: 'Medium',
        status: 'awaitFeedbackStatus',
        assigned: [
            {
                firstName: 'Thanh',
                lastName: 'Hoa',
                initials: 'TH',
                userColor: '#354C5F',
                email: 'hoa.thanh97@mail.de',
                phone: '032232354224',
                password: null,
                isYou: false,
                userID: 9
            },
            {
                firstName: 'Ergun',
                lastName: 'Pamuk',
                initials: 'EP',
                userColor: '#E20CB7',
                email: 'e.pamuk95@mail.de',
                phone: '03534552234',
                password: null,
                isYou: false,
                userID: 6
            },
        ],
        subtasks: [
            {
                taskDescription: 'Identify key breakpoints for responsive design.',
                isDone: false
            },
            {
                taskDescription: 'Adjust CSS and layout for different screen sizes.',
                isDone: false
            },

        ],
    },

]

async function loadeBackup() {
    await setItem('users', JSON.stringify(backupUsers));
    await setItem('tasks', JSON.stringify(backupTasks));
}