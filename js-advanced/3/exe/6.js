function solve(input) {
    const productsData = input.reduce((acc, curr) => {
        let [product, price] = curr.split(' : ');
        acc[product] = price;

        return acc;
    }, {});

    const productNames = Object.keys(productsData);
    const sortedProductsNames = productNames.sort();

    let currentLetter;

    sortedProductsNames.forEach(product => {
        let firstChar = product.charAt(0);

        if (firstChar !== currentLetter) {
            currentLetter = firstChar;
            console.log(firstChar);
        }

        console.log(`  ${product}: ${productsData[product]}`);
    });
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
