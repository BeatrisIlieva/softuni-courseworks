function solve(input) {
    const horses = input.shift().split('|');

    let command = input.shift();

    while (command !== 'Finish') {
        const line = command.split(' ');
        const action = line.shift();

        switch (action) {
            case 'Retake':
                const overtakingHorse = line.shift();
                const overtakenHorse = line.shift();

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
                const horse = line.shift();
                const horseIndex = horses.indexOf(horse);

                if (horseIndex > 0) {
                    horses.splice(horseIndex, 1);
                    horses.splice(horseIndex - 1, 0, horse);

                    console.log(`Trouble for ${horse} - drops one position.`);
                }
                break;
            case 'Rage':
                const ragingHorse = line.shift();
                const ragingHorseIndex = horses.indexOf(ragingHorse);
                const ragingHorseNewIndex = Math.min(ragingHorseIndex + 2, horses.length - 1);

                horses.splice(ragingHorseIndex, 1);
                horses.splice(ragingHorseNewIndex, 0, ragingHorse);

                console.log(`${ragingHorse} rages 2 positions ahead.`);
                break;
            case 'Miracle':
                const miracleHorse = horses.shift();

                horses.push(miracleHorse);

                console.log(`What a miracle - ${miracleHorse} becomes first.`);
                break;
        }

        command = input.shift();
    }

    console.log(horses.join('->'));

    console.log(`The winner is: ${horses[horses.length - 1]}`);
}

solve([
    'Onyx|Domino|Sugar|Fiona',
    'Trouble Onyx',
    'Retake Onyx Sugar',
    'Rage Domino',
    'Miracle',
    'Finish'
]);
