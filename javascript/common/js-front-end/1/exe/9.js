function solve(fruit, weighInGrams, pricePerKilogram) {
    const weightInKilograms = weighInGrams / 1000;
    const totalPrice = (weightInKilograms * pricePerKilogram).toFixed(2);

    console.log(`I need $${totalPrice} to buy ${weightInKilograms.toFixed(2)} kilograms ${fruit}.`);
}

solve('orange', 2500, 1.8);
