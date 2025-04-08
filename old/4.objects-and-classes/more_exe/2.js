function solve(input) {
    const result = input.reduce((acc, curr) => {
        [product, price] = curr.split(' : ');

        acc[product] = price;
        return acc;
    }, {});

    const sortedResult = Object.keys(result).sort((a, b) => a.localeCompare(b));

    let letter = sortedResult[0][0];
    console.log(letter);

    for (let product of sortedResult) {
        if (!(product[0] === letter)) {
            letter = product[0];

            console.log(letter);
        }

        console.log(`  ${product}: ${result[product]}`);
    }
}

solve([
    'Appricot : 20.4',

    'Fridge : 1500',

    'TV : 1499',

    'Deodorant : 10',

    'Boiler : 300',

    'Apple : 1.25',

    'Anti-Bug Spray : 15',

    'T-Shirt : 10',
]);
