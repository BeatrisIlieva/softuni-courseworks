// import sumOfNumbers from './calculator.mjs'; // default import; 
                                            // we can change the name of the functionalities
import calculator, { subtract, divide } from './03.es6-calculator.mjs'; // default import and named import; 
                                            // we can destructure the functionalities that we import
                                            // we cannot change the name of the functionality

// console.log(sumOfNumbers(1, 2)); // 3
console.log(calculator.multiply(2, 2)); // 4
console.log(subtract(1, 2)); // -1
console.log(divide(4, 2)); // 2
