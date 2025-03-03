const cars = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Alfa'];

// forEach()
// its goal is to execute an action over each element
// it accepts a callback function
// a callback function does not return a result but executes an action over an element
cars.forEach((car, index) => console.log(car.toLowerCase()));

// map()
// map() allows us to create a new array with a new reference that contains the same number
// of elements as the original one, but the elements are modified by certain rule
const upperCars = cars.map((car, index) => car.toUpperCase());
console.log(upperCars); // ['BMW', 'MERCEDES', 'AUDI', 'TOYOTA'];
console.log(cars); // ['BMW', 'Mercedes', 'Audi', 'Toyota']

// some()
// it accepts predicate (a function that takes an input and returns a boolean)
// return the first element that meets the condition
const hasCarWithT = cars.some((car, index) => car.startsWith('T'));
console.log(hasCarWithT); // true

// find()
// it accepts predicate (a function that takes an input and returns a boolean)
// it returns the first element that meets the condition
const carWithT = cars.find((car, index) => car.startsWith('T'));
console.log(carWithT); // Toyota

// filter
// it accepts predicate (a function that takes an input and returns a boolean)
// returns an array with all matches
const carsWithA = cars.filter((car, index) => car.startsWith('A'));
console.log(carsWithA); // ['Audi', 'Alfa']
