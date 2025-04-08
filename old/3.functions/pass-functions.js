function executeOperation(operation, operand1, operand2) {
    const result = operation(operand1, operand2);

    console.log(`Result is ${result}`);
}

function sum(a, b) {
    return a + b;
}

// Pass function by reference
executeOperation(sum, 1, 2);

// Pass function expression body as an argument
executeOperation(
    function (a, b) {
        return a / b;
    },
    10,
    2
);

// Pass arrow function body as argument
executeOperation((a, b) => a * b, 2, 2);
