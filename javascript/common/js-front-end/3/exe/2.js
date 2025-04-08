function solve(a, b, c) {
    sum = (a, b) => a + b;
    subtract = (a, b) => a - b;

    const sumOfNumbers = sum(a, b);
    console.log(subtract(sumOfNumbers, c));
}

solve(
    23,

    6,

    10
);
