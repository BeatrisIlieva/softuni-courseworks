function solve(input) {
    const count = Number(input.shift());

    const baristas = {};

    for (let i = 0; i < count; i++) {
        let [name, shift, skills] = input.shift().split(' ');

        skills = skills.split(',');

        baristas[name] = { shift, skills };
    }

    let command = input.shift();

    while (command != 'Closed') {
        const line = command.split(' / ');
        const action = line.shift();
        const name = line.shift();

        switch (action) {
            case 'Prepare':
                const [shift, coffeeType] = line;
                let result = '';

                if (baristas[name].shift != shift) {
                    result = `${name} is not available to prepare a ${coffeeType}.`;
                } else if (
                    !baristas[name].skills.includes(coffeeType)
                ) {
                    result = `${name} is not available to prepare a ${coffeeType}.`;
                } else {
                    result = `${name} has prepared a ${coffeeType} for you!`;
                }

                console.log(result);
                break;

            case 'Change Shift':
                const newShift = line.pop();

                baristas[name].shift = newShift;

                console.log(
                    `${name} has updated his shift to: ${newShift}`
                );

                break;

            case 'Learn':
                const newCoffeeType = line.pop();

                if (baristas[name].skills.includes(newCoffeeType)) {
                    console.log(
                        `${name} knows how to make ${newCoffeeType}.`
                    );
                } else {
                    baristas[name].skills.push(newCoffeeType);
                    console.log(
                        `${name} has learned a new coffee type: ${newCoffeeType}.`
                    );
                }
                break;
        }

        command = input.shift();
    }

    Object.entries(baristas).forEach(([key, value]) => {
        console.log(
            `Barista: ${key}, Shift: ${
                value.shift
            }, Drinks: ${value.skills.join(', ')}`
        );
    });
}

solve([
    '4',
    'Alice day Espresso,Cappuccino',
    'Bob night Latte,Mocha',
    'Carol day Americano,Mocha',
    'David night Espresso',
    'Prepare / Alice / day / Espresso',
    'Change Shift / Bob / day',
    'Learn / Carol / Latte',
    'Prepare / Bob / night / Latte',
    'Learn / David / Cappuccino',
    'Prepare / Carol / day / Cappuccino',
    'Change Shift / Alice / night',
    'Learn / Bob / Mocha',
    'Prepare / David / night / Espresso',
    'Closed'
]);
