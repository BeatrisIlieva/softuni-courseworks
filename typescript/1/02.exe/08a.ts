type User3 = { username: string; signupDate: Date };
type Task3 = {
    status: 'Logged' | 'Started' | 'InProgress' | 'Done';
    title: string;
    daysRequired: number;
    assignedTo:
        | {
              username: string;
              signupDate: Date;
          }
        | undefined;
    changeStatus(newStatus: 'Logged' | 'Started' | 'InProgress' | 'Done'): void;
};

function assignTask(
    user: User3,
    task: Task3
) {
    if (task.assignedTo == undefined) {
        task.assignedTo = user;
        console.log(`User ${user.username} assigned to task '${task.title}'`);
    }
}

let user = {
    username: 'Margaret',
    signupDate: new Date(2022, 1, 13),
    passwordHash: 'random'
};
let task1 = {
    status: <'Logged' | 'Started' | 'InProgress' | 'Done'>'Logged',
    title: 'Need assistance',
    daysRequired: 1,
    assignedTo: undefined,
    changeStatus(newStatus: 'Logged' | 'Started' | 'InProgress' | 'Done') {
        this.status = newStatus;
    }
};

let task2 = {
    status: <'Logged' | 'Started' | 'InProgress' | 'Done'>'Done',
    title: 'Test',
    daysRequired: 12,
    assignedTo: undefined,
    changeStatus(newStatus: 'Logged' | 'Started' | 'InProgress' | 'Done') {
        this.status = newStatus;
    },
    moreProps: 300,
    evenMore: 'wow'
};

assignTask(user, task1);
assignTask(user, task2);

// User Margaret assigned to task 'Need assistance'
// User Margaret assigned to task 'Test'
