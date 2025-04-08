function solve(stock, orders) {
    const stockObj = stock.reduce((acc, curr, index) => {
        index % 2 == 0 && (acc[curr] = Number(stock[index + 1]));

        return acc;
    }, {});

    orders.forEach((element, index) => {
        if (index % 2 == 0) {
            const product = element;

            stockObj[product] ??= 0;

            stockObj[product] += Number(orders[index + 1]);
        }
    });

    for (let product in stockObj) {
        console.log(`${product} -> ${stockObj[product]}`);
    }
}

solve(
    ['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],

    ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30']
);
