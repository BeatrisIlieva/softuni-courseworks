function solve(input) {
    const productsData = {};

    input.forEach(data => {
        let [town, product, productPrice] = data.split(' | ');
        productPrice = Number(productPrice);

        if (productsData.hasOwnProperty(product)) {
            const currentElement = productsData[product];
            const currentPrice = currentElement.productPrice;

            if (currentPrice > productPrice) {
                productsData[product].productPrice = productPrice;
                productsData[product].town = town;

            }
        } else {
            productsData[product] = { productPrice, town };
        }
    });

    for (const product in productsData) {
        console.log(`${product} -> ${productsData[product].productPrice} (${productsData[product].town})`);
    }
}

solve([
    'Sample Town | Sample Product | 1000',

    'Sample Town | Orange | 2',

    'Sample Town | Peach | 1',

    'Sofia | Orange | 3',

    'Sofia | Peach | 2',

    'New York | Sample Product | 1000.1',

    'New York | Burger | 10',
]);
