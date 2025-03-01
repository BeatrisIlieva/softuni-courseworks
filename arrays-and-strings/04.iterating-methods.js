// forEach()
// we need to pass a callback function that to execute for each element in the array
// we use it when we need to execute an action over each element
const cars = ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda'];

// this is an expression
cars.forEach((car, index) => console.log(car, index));

// this is a statement
for (let car of cars) {
    console.log(car);
}

// map()
// creates a new array (with new reference) with the same number of elements, however the elements are modified
// by a certain way

const mappedCars = cars.map(car => car.charAt(0));
console.log(mappedCars); // ['B', 'A', 'M', 'T', 'H']

// filter()
// creates a new collection taking the elements from the old one,
// which elements meet a certain criteria

const numbers = [1, 2, 3, 4, 5, 6];
const oddNumbers = numbers.filter(number => number % 2 !== 0);
console.log(oddNumbers); // [1, 3, 5]
console.log(numbers); // [1, 2, 3, 4, 5, 6]
