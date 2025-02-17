// Non Mutating

let cars = ['Mercedes', 'Toyota'];

// Join

// Concat
let moreCars = ['Audi', 'BMW'];
let allCars = moreCars.concat(cars);

console.log(allCars);

let carsWithoutPush = allCars.concat('Porche');
console.log(carsWithoutPush);

// Slice
// non mutaing
// it gets one part of the array and creates a new array
let firstCars = carsWithoutPush.slice(0, 3);
console.log(firstCars);
// ['Audi', 'BMW', 'Mercedes']
let lastCars = carsWithoutPush.slice(3);
console.log(lastCars);
// ['Toyota', 'Porche']

let copy = carsWithoutPush.slice();
console.log(copy);
// ['Audi', 'BMW', 'Mercedes', 'Toyota', 'Porche']

// the variables point to two different places in memory
console.log(copy === carsWithoutPush); // false
