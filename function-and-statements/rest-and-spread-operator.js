// rest
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3, 4, 5));

function sum2(a, b) {
    return a + b;
}

const numbers = [1, 2];

//spread
console.log(sum2(...numbers));

// array destructuring with rest
const nums = [1, 2, 3, 4, 5];
const [firstNum, secondNum, ...rest] = nums;
console.log(firstNum); // 1
console.log(secondNum); // 2
console.log(rest); // [1, 2, 3]

function printPeople({ Ivan, ...rest }) {
    console.log(Ivan); // 20
    console.log(rest); // {Georgi: 30, Peter: 40, Jan: 50 }
}

// object destructuring
const people = { Ivan: 20, Georgi: 30, Peter: 40, Jan: 50 };
const copyPeople = { ...people };
console.log(copyPeople);

printPeople(people);

const cars = ['Audi', 'BMW', 'Tesla'];
cars[10] = 'Toyota';
console.log(cars); // ['Audi', 'BMW', 'Tesla', …, 'Toyota']
console.log(cars.length); // 11

// There are only 4 spots taken in memory, 
// and at the rest spots there are undefined; only the length is increased
// because in JS arrays are sparse
