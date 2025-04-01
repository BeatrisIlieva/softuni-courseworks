function executeOperation(operation, operandA, operandB) {
    return operation(operandA, operandB);
}

function sum(a, b) {
    return a + b;
}

// Pass function by reference
console.log(executeOperation(sum, 1, 2));

// Pass inline function expression
console.log(executeOperation((a, b) => a + b, 1, 2));

// We can pass inline only function expressions and arrow functions
