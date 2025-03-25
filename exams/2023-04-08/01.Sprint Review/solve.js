function solve(input) {
    const count = Number(input.shift());

    const assignees = {};

    for (let i = 0; i < count; i++) {
        const [assignee, taskId, title, status, estimatedPoints] = input.shift().split(':');

        if (!assignees.hasOwnProperty(assignee)) {
            assignees[assignee] = [];
        }

        const task = { taskId, title, status, estimatedPoints: Number(estimatedPoints) };

        assignees[assignee].push(task);
    }

    input.forEach(element => {
        const [action, assignee, ...args] = element.split(':');

        if (action === 'Add New') {
            if (!assignees.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            } else {
                const task = {
                    taskId: args[0],
                    title: args[1],
                    status: args[2],
                    estimatedPoints: Number([args[3]])
                };

                assignees[assignee].push(task);
            }
        } else if (action === 'Change Status') {
            if (!assignees.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            } else {
                let task;
                Object.values(assignees).forEach(element => {
                    element.forEach(item => {
                        if (item.taskId === args[0]) {
                            task = item;
                        }
                    });
                });

                if (!task) {
                    console.log(`Task with ID ${args[0]} does not exist for ${assignee}!`);
                } else {
                    task.status = args[1];
                }
            }
        } else if (action === 'Remove Task') {
            if (!assignees.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            } else {
                const index = Number(args[0]);
                const length = assignees[assignee].length;

                if (index >= length || index < 0) {
                    console.log('Index is out of range!');
                } else {
                    assignees[assignee].splice(index, 1);
                }
            }
        }
    });

    let toDoTasksTotalPoints = 0;
    let inProgressTasksTotalPoints = 0;
    let codeReviewTasksTotalPoints = 0;
    let doneTasksTotalPoints = 0;

    Object.values(assignees).forEach(element => {
        element.forEach(item => {
            if (item.status === 'ToDo') {
                toDoTasksTotalPoints += item.estimatedPoints;
            } else if (item.status === 'In Progress') {
                inProgressTasksTotalPoints += item.estimatedPoints;
            } else if (item.status === 'Code Review') {
                codeReviewTasksTotalPoints += item.estimatedPoints;
            } else if (item.status === 'Done') {
                doneTasksTotalPoints += item.estimatedPoints;
            }
        });
    });

    console.log(`ToDo: ${toDoTasksTotalPoints}pts`);
    console.log(`In Progress: ${inProgressTasksTotalPoints}pts`);
    console.log(`Code Review: ${codeReviewTasksTotalPoints}pts`);
    console.log(`Done Points: ${doneTasksTotalPoints}pts`);

    const success =
        doneTasksTotalPoints >=
        toDoTasksTotalPoints + inProgressTasksTotalPoints + codeReviewTasksTotalPoints;

    if (success) {
        console.log(`Sprint was successful!`);
    } else {
        console.log(`Sprint was unsuccessful...`);
    }
}

solve([
    '5',
    'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
    'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
    'Peter:BOP-1211:POC:Code Review:5',
    'Georgi:BOP-1212:Investigation Task:Done:2',
    'Mariya:BOP-1213:New Account Page:In Progress:13',
    'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
    'Change Status:Peter:BOP-1211:ToDo',
    'Remove Task:Mariya:1',
    'Remove Task:Joro:1'
]);
