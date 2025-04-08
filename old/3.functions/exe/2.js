function solve(...numbers) {
    const [a, b, c] = [...numbers];

    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;

    return subtract(add(a, b), c);
}

console.log(solve(23, 6, 10));
