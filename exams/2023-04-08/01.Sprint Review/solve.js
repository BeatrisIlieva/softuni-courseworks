function solve(input) {
    const count = Number(input.shift());

    const assignees = {};

    for (let i = 0; i < count; i++) {
        const [assignee, taskId, title, status, estimatedPoints] = input.shift().split(':');

        if (!assignees.hasOwnProperty(assignee)) {
            assignees[assignee] = [];
        }

        assignees[assignee].push({
            taskId,
            title,
            status,
            estimatedPoints: Number(estimatedPoints)
        });
    }

    input.forEach(item => {
        const [action, assignee, ...args] = item.split(':');
        switch (action) {
            case 'Add New':
                if (!assignees.hasOwnProperty(assignee)) {
                    console.log(`Assignee ${assignee} does not exist on the board!`);
                } else {
                    const [taskId, title, status, estimatedPoints] = args;

                    assignees[assignee].push({
                        taskId,
                        title,
                        status,
                        estimatedPoints: Number(estimatedPoints)
                    });
                }
                break;
            case 'Change Status':
                if (!assignees.hasOwnProperty(assignee)) {
                    console.log(`Assignee ${assignee} does not exist on the board!`);
                } else {
                    const [taskId, status] = args;

                    const assigneeTasks = assignees[assignee];

                    let taskExists = false;

                    assigneeTasks.forEach(task => {
                        if (task.taskId === taskId) {
                            taskExists = true;
                            task.status = status;
                        }
                    });

                    if (!taskExists) {
                        console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
                    }
                }

                break;
            case 'Remove Task':
                if (!assignees.hasOwnProperty(assignee)) {
                    console.log(`Assignee ${assignee} does not exist on the board!`);
                } else {
                    const index = Number(args[0]);

                    const assigneeTasks = assignees[assignee];

                    if (index < 0 || index >= assigneeTasks.length) {
                        console.log(`Index is out of range!`);
                    } else {
                        assigneeTasks.splice(index, 1);
                    }
                }
                break;
        }
    });

    let toDoTasksTotalPoints = 0;
    let inProgressTasksTotalPoints = 0;
    let codeReviewTasksTotalPoints = 0;
    let doneTasksTotalPoints = 0;

    Object.values(assignees).forEach(tasks => {
        tasks.forEach(task => {
            if (task.status === 'ToDo') {
                toDoTasksTotalPoints += task.estimatedPoints;
            } else if (task.status === 'In Progress') {
                inProgressTasksTotalPoints += task.estimatedPoints;
            } else if (task.status === 'Code Review') {
                codeReviewTasksTotalPoints += task.estimatedPoints;
            } else if (task.status === 'Done') {
                doneTasksTotalPoints += task.estimatedPoints;
            }
        });
    });

    console.log(`ToDo: ${toDoTasksTotalPoints}pts`);
    console.log(`In Progress: ${inProgressTasksTotalPoints}pts`);
    console.log(`Code Review: ${codeReviewTasksTotalPoints}pts`);
    console.log(`Done Points: ${doneTasksTotalPoints}pts`);

    const sum = inProgressTasksTotalPoints + codeReviewTasksTotalPoints + toDoTasksTotalPoints;
    const success = doneTasksTotalPoints >= sum;

    if (success) {
        console.log(`Sprint was successful!`);
    } else {
        console.log(`Sprint was unsuccessful...`);
    }
}

solve([
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done'
]);
