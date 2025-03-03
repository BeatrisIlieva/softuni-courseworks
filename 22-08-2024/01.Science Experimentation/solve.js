function solve(input) {
    const data = [...input];
    const number = data.shift();

    const chemicals = [];

    for (let i = 0; i < number; i++) {
        let [name, quantity] = data.shift().split(' # ');

        quantity = Math.min(Number(quantity), 500);

        chemicals.push({ name, quantity });
    }

    const actions = {
        Mix(rest) {
            let [firstChemicalName, secondChemicalName, quantity] =
                rest;

            quantity = Number(quantity);

            let firstChemicalObj = null;

            let secondChemicalObj = null;

            for (let i = 0; i < chemicals.length; i++) {
                const currentElementObj = chemicals[i];

                if (currentElementObj.name == firstChemicalName) {
                    firstChemicalObj = currentElementObj;
                } else if (
                    currentElementObj.name == secondChemicalName
                ) {
                    secondChemicalObj = currentElementObj;
                }
            }

            const firstChemicalAmountSufficient =
                firstChemicalObj.quantity >= quantity;

            const secondChemicalAmountSufficient =
                secondChemicalObj.quantity >= quantity;

            if (
                !firstChemicalAmountSufficient ||
                !secondChemicalAmountSufficient
            ) {
                console.log(
                    `Insufficient quantity of ${firstChemicalName}/${secondChemicalName} to mix.`
                );
            } else {
                firstChemicalObj.quantity -= quantity;
                secondChemicalObj.quantity -= quantity;

                console.log(
                    `${firstChemicalName} and ${secondChemicalName} have been mixed. ${quantity} units of each were used.`
                );
            }
        },
        Replenish(rest) {
            let [chemicalName, quantity] = rest;
            quantity = Number(quantity);

            const chemicalObj = chemicals.find(
                element => element.name === chemicalName
            );

            if (!chemicalObj) {
                console.log(
                    `The Chemical ${chemicalName} is not available in the lab.`
                );
            } else if (chemicalObj.quantity + quantity > 500) {
                chemicalObj.quantity === 500;

                console.log(
                    `${chemicalName} quantity increased by ${quantity} units, reaching maximum capacity of 500 units!`
                );
            } else {
                chemicalObj.quantity += quantity;

                console.log(
                    `${chemicalName} quantity increased by ${quantity} units!`
                );
            }
        },
        'Add Formula'(rest) {
            const [chemicalName, formula] = rest;

            const chemicalObj = chemicals.find(
                element => element.name == chemicalName
            );

            if (!chemicalObj) {
                console.log(
                    `The Chemical ${chemicalName} is not available in the lab.`
                );
            } else {
                chemicalObj['formula'] = formula;

                console.log(
                    `${chemicalName} has been assigned the formula ${formula}.`
                );
            }
        },
        End() {
            chemicals.forEach(element => {
                if (element.hasOwnProperty('formula')) {
                    console.log(
                        `Chemical: ${element.name}, Quantity: ${element.quantity}, Formula: ${element.formula}`
                    );
                } else {
                    console.log(
                        `Chemical: ${element.name}, Quantity: ${element.quantity}`
                    );
                }
            });
        }
    };

    data.forEach(element => {
        let [action, ...rest] = element.split(' # ');

        actions[action](rest);
    });
}

solve([
    '4',
    'Water # 200',
    'Salt # 100',
    'Acid # 50',
    'Base # 80',
    'Mix # Water # Salt # 50',
    'Replenish # Salt # 150',
    'Add Formula # Acid # H2SO4',
    'End'
]);
