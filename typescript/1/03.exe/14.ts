// class Calculator {
//     public calculate(operation: 'power' | 'log', a: number, b: number): number;
//     public calculate(
//         operations: 'add' | 'subtract' | 'multiply' | 'divide',
//         a: number,
//         b: number,
//         c?: number,
//         d?: number
//     ): number;

//     public calculate(
//         operation: 'power' | 'log' | 'add' | 'subtract' | 'multiply' | 'divide',
//         a: number,
//         b: number,
//         c?: number,
//         d?: number
//     ) {
//         const validNumbers = [a, b, c, d].filter((x) => x !== undefined);

//         switch (operation) {
//             case 'power':
//                 return a ** b;

//             case 'log':
//                 if (a <= 0 || b <= 0) {
//                     return 'Not valid number';
//                 }

//                 return Math.log(a) / Math.log(b);

//             case 'add':
//                 return validNumbers.reduce((acc, curr) => acc + curr);

//             case 'subtract':
//                 return validNumbers.reduce((acc, curr) => acc - curr);

//             case 'multiply':
//                 return validNumbers.reduce((acc, curr) => acc * curr);

//             case 'divide':
//                 return validNumbers.reduce((acc, curr) => acc / curr);
//         }
//     }
// }

class Calculator {
    calculate(operation: 'power' | 'log', a: number, b: number): number;
    calculate(
        operation: 'add' | 'subtract' | 'multiply' | 'divide',
        a: number,
        b: number,
        c?: number,
        d?: number
    ): number;

    calculate(
        operation: 'power' | 'log' | 'add' | 'subtract' | 'multiply' | 'divide',
        a: number,
        b: number,
        c?: number,
        d?: number
    ): number {
        const validNumbers = [a, b, c, d].filter((x) => x !== undefined);

        switch (operation) {
            case 'power':
                return a ** b;
            case 'log':
                Math.log(a) ** Math.log(b);
            case 'add':
                return validNumbers.reduce((acc, curr) => acc + curr);
            case 'subtract':
                return validNumbers.reduce((acc, curr) => acc - curr);
            case 'multiply':
                return validNumbers.reduce((acc, curr) => acc * curr);
            case 'divide':
                return validNumbers.reduce((acc, curr) => acc / curr);
        }
    }
}

const calc = new Calculator();
console.log(calc.calculate('power', 2, 3));
console.log(calc.calculate('power', 4, 1 / 2));
console.log(calc.calculate('log', 8, 2));
console.log(calc.calculate('add', 10, 5));
console.log(calc.calculate('add', 10, 5, 3));
console.log(calc.calculate('subtract', 10, 5));
console.log(calc.calculate('multiply', 2, 3, 4));
console.log(calc.calculate('divide', 100, 5, 2, 2));

// const calc = new Calculator();
// console.log(calc.calculate('power', 2, 3, 2));
// console.log(calc.calculate('add', 2));
// console.log(calc.calculate('log', 2, 3, 4, 5));
// console.log(calc.calculate('multiply', 2, 3, 4, 5, 6));
