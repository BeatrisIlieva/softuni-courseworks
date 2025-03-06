function solve(input) {
    const data = [...input];
    const heroCount = data.shift();

    const heroes = [];

    for (let i = 0; i < heroCount; i++) {
        let [name, superpowers, energy] = data.shift().split('-');
        superpowers = superpowers.split(',');
        energy = Number(energy);

        heroes.push({ name, superpowers, energy });
    }

    const actions = {
        'Use Power'(name, superpower, requiredEnergy) {
            const heroObj = getHero(name);

            let result = '';

            if (heroObj.energy < requiredEnergy) {
                result = `${name} is unable to use ${superpower} or lacks energy!`;
            } else if (!heroObj.superpowers.includes(superpower)) {
                result = `${name} is unable to use ${superpower} or lacks energy!`;
            } else {
                heroObj.energy -= requiredEnergy;
                result = `${name} has used ${superpower} and now has ${heroObj.energy} energy!`;
            }

            console.log(result);
        },
        Train(name, trainingEnergy) {
            trainingEnergy = Number(trainingEnergy);
            const heroObj = getHero(name);
            const initialHeroEnergy = heroObj.energy;

            if (initialHeroEnergy >= 100) {
                console.log(`${name} is already at full energy!`);
            } else {
                heroObj.energy = Math.min(
                    initialHeroEnergy + trainingEnergy,
                    100
                );
                const gainedEnergy =
                    heroObj.energy - initialHeroEnergy;
                console.log(
                    `${name} has trained and gained ${gainedEnergy} energy!`
                );
            }
        },
        Learn(name, superpower) {
            const heroObj = getHero(name);
            const heroKnowsThePower =
                heroObj.superpowers.includes(superpower);

            if (heroKnowsThePower) {
                console.log(`${name} already knows ${superpower}.`);
            } else {
                heroObj.superpowers.push(superpower);
                console.log(`${name} has learned ${superpower}!`);
            }
        },
        'Evil Defeated!'() {
            heroes.forEach(hero => {
                console.log(`Superhero: ${hero.name}`);

                console.log(
                    `- Superpowers: ${hero.superpowers.join(', ')}`
                );

                console.log(`- Energy: ${hero.energy}`);
            });
        }
    };

    while (true) {
        const [command, ...rest] = data.shift().split(' * ');

        if (command === 'Evil Defeated!') {
            actions[command]();
            break;
        }

        actions[command](...rest);
    }

    console.log(JSON.stringify(heroes));

    function getHero(name) {
        return heroes.find(hero => hero.name === name);
    }
}

solve([
    '3',
    'Iron Man-Repulsor Beams,Flight-80',
    'Thor-Lightning Strike,Hammer Throw-10',
    'Hulk-Super Strength-60',
    'Use Power * Iron Man * Flight * 30',
    'Train * Thor * 20',
    'Train * Hulk * 50',
    'Learn * Hulk * Thunderclap',
    'Use Power * Hulk * Thunderclap * 70',
    'Evil Defeated!'
]);
