const cars = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Alfa'];

// join()

console.log(cars.join(', ')); // BMW, Mercedes, Audi, Toyota, Alfa

// concat()
console.log(cars.concat([1, 2, 3])); // ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Alfa', 1, 2, 3]
console.log(cars.concat(1, 2, 3)); // ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Alfa', 1, 2, 3]

// slice
// creates a new array
const slicedArray = cars.slice(1, 4); // end excluding ['Mercedes', 'Audi', 'Toyota'];
console.log(slicedArray);

const carsCopy = cars.slice();
console.log(carsCopy); // ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Alfa']

console.log(carsCopy === cars); // false

const lastCars = cars.slice(3);
console.log(lastCars); // ['Toyota', 'Alfa']

// includes()
const hasAudi = cars.includes('Audi');
console.log(hasAudi); // true
