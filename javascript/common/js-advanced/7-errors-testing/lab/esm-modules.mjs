import sub from './calculator.mjs'; // default import
import { multiply, sum } from './calculator.mjs'; // named export

console.log(sub(10, 20));
console.log(multiply(10, 20));
console.log(sum(2, 3));
