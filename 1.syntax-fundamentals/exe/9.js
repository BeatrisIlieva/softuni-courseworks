function solve(fruitType, weightInGrams, pricePerKilogram) {
    weight = weightInGrams / 1000;

    totalPrice = weight * pricePerKilogram;

    console.log(
        `I need $${totalPrice.toFixed(2)} to buy ${weight.toFixed(
            2
        )} kilograms ${fruitType}.`
    );
}

solve('orange', 2500, 1.8);


