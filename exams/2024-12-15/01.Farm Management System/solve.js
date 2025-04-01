function solve(input) {
    const data = [...input];
    const number = data.shift();

    const farmers = [];

    for (let i = 0; i < number; i++) {
        let [name, area, tasks] = data.shift().split(' ');
        tasks = tasks.split(',');

        farmers.push({ name, area, tasks });
    }

    function checkIfFarmerKnowsTheTask(farmer, task) {
        const farmerTasks = farmer.tasks;

        return farmerTasks.includes(task);
    }

    function executeAction(action) {
        const actions = {
            Execute: (farmer, name, rest) => {
                const [area, task] = rest;

                const farmerArea = farmer.area;

                const farmerAlreadyLearnedTask =
                    checkIfFarmerKnowsTheTask(farmer, task);

                const canWork =
                    farmerArea === area && farmerAlreadyLearnedTask;

                const result = canWork
                    ? `${name} has executed the task: ${task}!`
                    : `${name} cannot execute the task: ${task}.`;

                console.log(result);
            },
            'Learn Task': (farmer, name, rest) => {
                const [task] = rest;

                const farmerAlreadyLearnedTask =
                    checkIfFarmerKnowsTheTask(farmer, task);

                if (farmerAlreadyLearnedTask) {
                    console.log(
                        `${name} already knows how to perform ${task}.`
                    );
                } else {
                    farmer.tasks.push(task);
                    console.log(
                        `${name} has learned a new task: ${task}.`
                    );
                }
            },
            'Change Area': (farmer, name, rest) => {
                const [area] = rest;

                farmer.area = area;

                console.log(
                    `${name} has changed their work area to: ${area}`
                );
            },
            End: () => {
                farmers.forEach(farmer => {
                    const sortedTasks = farmer.tasks
                        .sort((a, b) => a.localeCompare(b))
                        .join(', ');

                    console.log(
                        `Farmer: ${farmer.name}, Area: ${farmer.area}, Tasks: ${sortedTasks}`
                    );
                });
            }
        };

        return actions[action];
    }

    data.forEach(element => {
        const [action, name, ...rest] = element.split(' / ');

        const farmer = farmers.find(element => element.name === name);

        const executor = executeAction(action);

        executor && executor(farmer, name, rest);
    });
}

solve([
    '3',
    'Alex apiary harvesting,honeycomb',
    'Emma barn milking,cleaning',
    'Chris garden planting,weeding',
    'Execute / Alex / apiary / harvesting',
    'Learn Task / Alex / beeswax',
    'Execute / Alex / apiary / beeswax',
    'Change Area / Emma / apiary',
    'Execute / Emma / apiary / milking',
    'Execute / Chris / garden / watering',
    'Learn Task / Chris / pruning',
    'Execute / Chris / garden / pruning',
    'End'
]);
