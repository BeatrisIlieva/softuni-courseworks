let cars = ['Mercedes', 'BMW', 'Audi', 'Toyota', 'Alfa'];

// Non mutating
// The goal of forEach method is to iterate through the
// array and to execute an action on each element
// it accepts a callback function that executes an action on every element
cars.forEach((car, index) => {
    console.log(car.toUpperCase());
});

// Non mutating
// Map -> we use it to create a new array based on the original one
// the elements in the new array are the elements from the original one but modified
// in the new array we receive the same number of elements but changed by some criteria
// it needs a return statement

let upperCars = cars.map((car, index) => {
    return car.toLocaleUpperCase();
});

let upperCarsShort = cars.map(car => car.toLocaleUpperCase());

console.log(upperCarsShort);

// Includes -> both for strings and arrays
let hasAudi = cars.includes('Audi');
console.log(hasAudi);

// Non mutating
// Some -> returns true or false
// predicate - accepts a value at returns true or false
// stops at the first found
let hasCarWithT = cars.some((car, index) => {
    return car.startsWith('T');
});

console.log(hasCarWithT);

// Non mutating
// Find -> returns an element
// stops at the first found
let carWithB = cars.find((car, index) => {
    return car.startsWith('B');
});

console.log(carWithB);

// Non mutating
// Filter
// Returns all matches that meet the given condition and put them into an array
let carsWithA = cars.filter((car, index) => {
    console.log(index);
    return car.startsWith('A');
});

console.log(carsWithA);
