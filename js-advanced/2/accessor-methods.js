// Non Mutating

let cars = ['Mercedes', 'Toyota'];

// Join

// Concat
let moreCars = ['Audi', 'BMW'];
let allCars = moreCars.concat(cars);

console.log(allCars);

let carsWithoutPush = allCars.concat('Porche', 'Audi');
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

// Indexof
let audiIndex = carsWithoutPush.indexOf('Audi');
console.log(audiIndex);

let notExisting = carsWithoutPush.indexOf('Trabant');

if (notExisting < 0) {
    console.log('cannot find');
}

//seacrh from a given index
let nonExistingAudiIndex = carsWithoutPush.indexOf('Audi', 2);
console.log(nonExistingAudiIndex);
// - 1

let latAudiIndex = carsWithoutPush.lastIndexOf('Audi');
console.log(latAudiIndex);
