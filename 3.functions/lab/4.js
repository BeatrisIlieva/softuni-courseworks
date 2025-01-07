function solve(product, quantity) {
    const productsByPrice = {
        coffee: (quantity) => (quantity * 1.5).toFixed(2),
        water: (quantity) => (quantity * 1).toFixed(2),
        coke: (quantity) => (quantity * 1.4).toFixed(2),
        snacks: (quantity) => (quantity * 2).toFixed(2),
    };

    return productsByPrice[product](quantity);
}

console.log(solve('coffee', 2));
