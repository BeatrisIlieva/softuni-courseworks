function solve(input) {
    const data = [...input];
    const number = Number(data.shift());

    const chemicals = [];

    for (let i = 0; i < number; i++) {
        let [name, quantity] = data.shift().split(' # ');

        quantity = Number(quantity);

        chemicals.push({
            name,
            quantity: Number(quantity),
            formula: null
        });
    }

    const actions = {
        Mix(rest) {
            const [firstChemical, secondChemical, amount] = rest;

            let firstChemicalObj = null;
            let secondChemicalObj = null;

            chemicals.forEach(chemicalObj => {
                const chemicalName = chemicalObj.name;

                if (chemicalName === firstChemical) {
                    firstChemicalObj = chemicalObj;
                } else if (chemicalName === secondChemical) {
                    secondChemicalObj = chemicalObj;
                }
            });

            const mixNotPossible =
                !firstChemicalObj ||
                !secondChemicalObj ||
                firstChemicalObj.quantity < amount ||
                secondChemicalObj.quantity < amount;

            if (mixNotPossible) {
                console.log(
                    `Insufficient quantity of ${firstChemical}/${secondChemical} to mix.`
                );
            } else {
                firstChemicalObj.quantity -= amount;
                secondChemicalObj.quantity -= amount;

                console.log(
                    `${firstChemical} and ${secondChemical} have been mixed. ${amount} units of each were used.`
                );
            }
        },
        Replenish(rest) {
            let [chemicalName, amount] = rest;
            amount = Number(amount);

            const chemicalObj = chemicals.find(
                chemical => chemical.name === chemicalName
            );

            if (!chemicalObj) {
                console.log(
                    `The Chemical ${chemicalName} is not available in the lab.`
                );
            } else {
                const chemicalQuantity = Math.min(
                    chemicalObj.quantity + amount,
                    500
                );

                const addedAmount =
                    chemicalQuantity - chemicalObj.quantity;

                chemicalObj.quantity = chemicalQuantity;

                if (chemicalQuantity === 500) {
                    console.log(
                        `${chemicalName} quantity increased by ${addedAmount} units, reaching maximum capacity of 500 units!`
                    );
                } else {
                    console.log(
                        `${chemicalName} quantity increased by ${addedAmount} units!`
                    );
                }
            }
        },
        'Add Formula'(rest) {
            const [chemicalName, formula] = rest;

            const chemicalObj = chemicals.find(
                element => element.name === chemicalName
            );

            if (!chemicalObj) {
                console.log(
                    `The Chemical ${chemicalName} is not available in the lab.`
                );
            } else {
                chemicalObj.formula = formula;
                console.log(
                    `${chemicalName} has been assigned the formula ${formula}.`
                );
            }
        },
        End() {
            chemicals.forEach(chemical => {
                if (chemical.formula) {
                    console.log(
                        `Chemical: ${chemical.name}, Quantity: ${chemical.quantity}, Formula: ${chemical.formula}`
                    );
                } else {
                    console.log(
                        `Chemical: ${chemical.name}, Quantity: ${chemical.quantity}`
                    );
                }
            });
        }
    };

    for (const element of data) {
        let [action, ...rest] = element.split(' # ');

        actions[action](rest);

        if (action === 'End') {
            break;
        }
    }
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
    'End',
    'Add Formula # Acid # H2SO4'
]);
