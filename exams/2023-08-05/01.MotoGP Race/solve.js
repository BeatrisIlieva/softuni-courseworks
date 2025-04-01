function solve(input) {
    const count = Number(input.shift());
    const riders = {};

    for (let i = 0; i < count; i++) {
        const [rider, fuel, position] = input.shift().split('|');

        riders[rider] = {
            fuel: Math.min(Number(fuel), 100),
            position: Number(position)
        };
    }

    let command = input.shift();

    while (command !== 'Finish') {
        const [action, ...args] = command.split(' - ');

        switch (action) {
            case 'StopForFuel':
                let [rider, minimumFuel, changedPosition] = args;

                minimumFuel = Number(minimumFuel);
                changedPosition = Number(changedPosition);

                const riderObj = riders[rider];
                const riderHasEnoughFuel =
                    riderObj.fuel >= minimumFuel;

                if (!riderHasEnoughFuel) {
                    riderObj.position = changedPosition;

                    console.log(
                        `${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`
                    );
                } else {
                    console.log(
                        `${rider} does not need to stop for fuel!`
                    );
                }

                break;

            case 'Overtaking':
                const rider1 = args[0];
                const rider1Obj = riders[rider1];

                const rider2 = args[1];
                const rider2Obj = riders[rider2];

                const rider1Position = rider1Obj.position;
                const rider2Position = rider2Obj.position;

                const rider1IsAhead = rider1Position < rider2Position;

                if (rider1IsAhead) {
                    rider2Obj.position = rider1Position;
                    rider1Obj.position = rider2Position;

                    console.log(`${rider1} overtook ${rider2}!`);
                }
                break;

            case 'EngineFail':
                const [riderName, lapsLeft] = args;

                delete riders[riderName];

                console.log(
                    `${riderName} is out of the race because of a technical issue, ${Number(
                        lapsLeft
                    )} laps before the finish.`
                );
                break;
        }

        command = input.shift();
    }

    Object.entries(riders).forEach(([key, value]) => {
        console.log(`${key}`);

        console.log(`  Final position: ${value.position}`);
    });
}
