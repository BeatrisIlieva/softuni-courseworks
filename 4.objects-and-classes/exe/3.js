function solve(firstArray, secondArray) {
    const data = [...firstArray, ...secondArray];
    const result = {};

    for (let i = 0; i < data.length; i += 2) {
        const product = data[i];
        const quantity = Number(data[i + 1]);

        if (!result.hasOwnProperty(product)) {
            result[product] = 0;
        }

        result[product] += quantity;
    }

    for (key in result) {
        console.log(`${key} -> ${result[key]}`);
    }
}

solve(
    ['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],

    ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30']
);
