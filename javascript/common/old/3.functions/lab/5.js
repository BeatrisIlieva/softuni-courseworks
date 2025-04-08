function solve(a, b, operator) {
    const calculator = {
        multiply: (a, b) => a * b,
        divide: (a, b) => a / b,
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
    };

    return calculator[operator](a, b);
}

console.log(solve(5, 5, 'multiply'));
