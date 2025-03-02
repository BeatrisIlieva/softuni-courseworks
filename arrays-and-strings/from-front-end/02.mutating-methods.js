/* We use push() and pop() to achieve a stack */

const cars = ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda'];

// pop()
// get and remove last item
const lastCar = cars.pop();

console.log(cars); //  ['BMW', 'Audi', 'Mercedes', 'Toyota']
console.log(lastCar); // Honda

// push()
// add last item and returns the new length
const newLength = cars.push(lastCar, 'VW');

console.log(cars); // ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda', 'VW']
console.log(newLength); // 6

// shift()
// removes and returns the first element
// all indices move to the left
const firstCar = cars.shift();
console.log(cars); // ['Audi', 'Mercedes', 'Toyota', 'Honda', 'VW']
console.log(firstCar); // BMW

// unshift()
// add a new element at the beginning and returns the new length
// all indices move to the right
const newLength2 = cars.unshift(firstCar);
console.log(newLength2); // 6
console.log(cars); // ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda', 'VW']

// splice()
// removes, replaces, adds elements
// it returns the removed elements as an array
const numbers = [1, 2, 3, 4, 5];

numbers.splice(3); // removes everything after including the second index
console.log(numbers); // [1, 2, 3]

numbers.splice(1, 1, 10); // replace
console.log(numbers); // [1, 10, 3]

numbers.splice(1, 0, 20);
console.log(numbers); // [1, 20, 10, 3]

// remove a specific element
numbers.splice(2, 1);
console.log(numbers); // [1, 20, 3]

const elements = ['a', 'b', 'c', 'd', 'e', 'f'];
const removedTwoElements = elements.splice(1, 2);
console.log(elements); // ['a', 'd', 'e', 'f']
console.log(removedTwoElements); // ['b', 'c']

const removedZeroElements = elements.splice(1, 0, 'g');
console.log(elements); // ['a', 'g', 'd', 'e', 'f']
console.log(removedZeroElements); // []

// reverse()
const reversed = elements.reverse();
console.log(elements); // ['f', 'e', 'd', 'g', 'a']
console.log(reversed); // ['f', 'e', 'd', 'g', 'a']

console.log(reversed === elements); // true -> 
// because both arrays refer to one and the same place in memory
// when we compare reference data types we do not compare what they variables contain
// but if their reference is one and the same

reversed[1] = '0';
console.log(reversed); // ['f', '0', 'd', 'g', 'a']
console.log(elements); // ['f', '0', 'd', 'g', 'a']
