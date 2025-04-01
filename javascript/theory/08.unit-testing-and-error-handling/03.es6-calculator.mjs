// DEFAULT EXPORT - we can have only one default export

// function sum(a, b) {
//     return a + b;
// }

// export default sum;

// export default function sum(a, b) {
//     return a + b;
// }

// Error: SyntaxError: Duplicate export of 'default'
// export default function multiply(a, b) {
//     return a * b;
// }

function multiply(a, b) {
    return a * b;
}

function power(a, b) {
    return a ** b;
}

const calculator = { multiply, power };

export default calculator;

// NAMED EXPORT - we can have as many named exports as we need

export function subtract(a, b) {
    return a - b;
}

export function divide(a, b) {
    return a / b;
}
