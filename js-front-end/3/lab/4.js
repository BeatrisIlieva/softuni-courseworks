function solve(product, quantity) {
    const productsByPrice = {
        coffee: 1.5,
        water: 1.0,
        coke: 1.4,
        snacks: 2.0
    };

    console.log((productsByPrice[product] * quantity).toFixed(2));
}

solve('water', 5);
