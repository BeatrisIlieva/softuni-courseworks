// Sort !mutating method
let numbers = [10, 2, 8, 1, 23, 9, 7];

// Default sort - orders by ASCII
// numbers.sort();

// Ascending
numbers.sort((a, b) => a - b);
console.log(numbers);

//Descending
numbers.sort((a, b) => b - a);
console.log(numbers);

let cars = ['Mercedes', 'BMW', 'audi', 'Toyota'];
cars.sort((a, b) => a.localeCompare(b));
console.log(cars);
