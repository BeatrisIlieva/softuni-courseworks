function solve(input) {
    const horses = input.shift().split('|');

    let command = input.shift();

    while (command !== 'Finish') {
        const [action, ...args] = command.split(' ');

        switch (action) {
            case 'Retake':
                const [overtakingHorse, overtakenHorse] = args;

                const overtakingHorseIndex = horses.indexOf(overtakingHorse);
                const overtakenHorseIndex = horses.indexOf(overtakenHorse);

                if (overtakingHorseIndex < overtakenHorseIndex) {
                    [horses[overtakingHorseIndex], horses[overtakenHorseIndex]] = [
                        horses[overtakenHorseIndex],
                        horses[overtakingHorseIndex]
                    ];

                    console.log(`${overtakingHorse} retakes ${overtakenHorse}.`);
                }
                break;

            case 'Trouble':
                const horseName = args.pop();

                const horseIndex = horses.indexOf(horseName);

                if (horseIndex > 0) {
                    horses.splice(horseIndex, 1);
                    horses.splice(horseIndex - 1, 0, horseName);

                    console.log(`Trouble for ${horseName} - drops one position.`);
                }
                break;

            case 'Rage':
                const horsesLength = horses.length;
                const ragingHorseName = args.pop();
                const ragingHorseIndex = horses.indexOf(ragingHorseName);

                const itsAlreadyInFirstPosition = horsesLength - 1 === ragingHorseIndex;

                if (!itsAlreadyInFirstPosition) {
                    const newIndex = Math.min(ragingHorseIndex + 2, horsesLength - 1);

                    horses.splice(ragingHorseIndex, 1);
                    horses.splice(newIndex, 0, ragingHorseName);
                }

                console.log(`${ragingHorseName} rages 2 positions ahead.`);

                break;

            case 'Miracle':
                const miracleHorse = horses.splice(0, 1);
                horses.push(miracleHorse);

                console.log(`What a miracle - ${miracleHorse} becomes first.`);
                break;
        }

        command = input.shift();
    }
    const winner = horses[horses.length - 1];

    console.log(horses.join('->'));
    console.log(`The winner is: ${winner}`);
}

solve([
    'Onyx|Domino|Sugar|Fiona',
    'Trouble Onyx',
    'Retake Onyx Sugar',
    'Rage Domino',
    'Miracle',
    'Finish'
]);
