function solve(input) {
    const result = input.reduce((acc, curr) => {
        const commands = {
            addLeader: 'arrives',
            addArmy: ':',
            increaseArmy: '+',
            removeLeaderAndArmy: 'defeated',
        };

        if (curr.includes(commands.addLeader)) {
            const splitElement = curr.split(commands.addLeader);
            let [leaderName, _] = splitElement;
            leaderName = leaderName.trim();

            acc[leaderName] = {};

            return acc;
        }

        if (curr.includes(commands.addArmy)) {
            const [leaderName, armyInfo] = curr.split(': ');
            let [armyName, armyCount] = armyInfo.split(', ');
            armyName = armyName.trim();

            if (acc[leaderName]) {
                acc[leaderName][armyName] = Number(armyCount);
            }

            return acc;
        }

        if (curr.includes(commands.increaseArmy)) {
            const [armyName, armyCount] = curr.split(' + ');

            Object.entries(acc).forEach(([key, value]) => {
                if (value[armyName]) {
                    acc[key][armyName] += Number(armyCount);
                }
            });

            return acc;
        }

        if (curr.includes(commands.removeLeaderAndArmy)) {
            const [leaderName, _] = curr.split(' defeated');
            delete acc[leaderName];

            return acc;
        }
    }, {});

    function getTotalArmyCount(value) {
        let totalArmyCount = 0;

        for (let el in value) {
            totalArmyCount += value[el];
        }

        return totalArmyCount;
    }

    Object.entries(result)
        .sort((a, b) => {
            return getTotalArmyCount(b[1]) - getTotalArmyCount(a[1]);
        })
        .map(([leader, details]) => {
            const total = getTotalArmyCount(details);
            const sortedDetails = Object.entries(details).sort((a, b) => b[1] - a[1]);
            console.log(`${leader}: ${total}`);
            sortedDetails.forEach((el) => {
                console.log(`>>> ${el[0]} - ${el[1]}`);
            });

            return sortedDetails;
        });
}

solve([
    'Rick Burr arrives',
    'Findlay arrives',
    'Rick Burr: Juard, 1500',
    'Wexamp arrives',
    'Findlay: Wexamp, 34540',
    'Wexamp + 340',
    'Wexamp: Britox, 1155',
    'Wexamp: Juard, 43423',
]);
