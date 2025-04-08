function solve(a, b, c) {
    const multiply = (a, b) => a * b;

    return multiply(a, multiply(b, c)) > 0 ? 'Positive' : 'Negative';
}

console.log(solve(1, 2, 3));
