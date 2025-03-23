function solve(input) {
    const count = Number(input.shift());
    const astronauts = {};

    for (let i = 0; i < count; i++) {
        const [name, oxygen, energy] = input.shift().split(' ');

        astronauts[name] = {
            oxygen: Number(oxygen),
            energy: Number(energy)
        };
    }

    let command = input.shift();

    while (command != 'End') {
        const [action, name, number] = command.split(' - ');

        switch (action) {
            case 'Explore':
                const astronautEnergy = astronauts[name].energy;
                const energyNeeded = Number(number);

                if (astronautEnergy >= energyNeeded) {
                    astronauts[name].energy -= energyNeeded;

                    console.log(
                        `${name} has successfully explored a new area and now has ${astronauts[name].energy} energy!`
                    );
                } else {
                    console.log(
                        `${name} does not have enough energy to explore!`
                    );
                }
                break;

            case 'Refuel':
                const currentEnergy = astronauts[name].energy;
                const energyToAdd = Number(number);

                astronauts[name].energy = Math.min(
                    currentEnergy + energyToAdd,
                    200
                );

                const difference =
                    astronauts[name].energy - currentEnergy;

                console.log(
                    `${name} refueled their energy by ${difference}!`
                );
                break;

            case 'Breathe':
                const currentOxygen = astronauts[name].oxygen;
                const oxygenToAdd = Number(number);

                astronauts[name].oxygen = Math.min(
                    currentOxygen + oxygenToAdd,
                    100
                );

                const diff = astronauts[name].oxygen - currentOxygen;

                console.log(
                    `${name} took a breath and recovered ${diff} oxygen!`
                );
                break;
        }

        command = input.shift();
    }

    Object.entries(astronauts).forEach(([key, value]) => {
        console.log(
            `Astronaut: ${key}, Oxygen: ${value.oxygen}, Energy: ${value.energy}`
        );
    });
}

solve([
    '3',
    'John 50 120',
    'Kate 80 180',
    'Rob 70 150',
    'Explore - John - 50',
    'Refuel - Kate - 30',
    'Breathe - Rob - 20',
    'End'
]);
