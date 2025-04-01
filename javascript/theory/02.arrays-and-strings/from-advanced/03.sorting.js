// sort() is mutating method

const numbers = [2, 8, 1, 9, 7];
const sortedNumbers = numbers.sort();
console.log(numbers); // [1, 2, 7, 8, 9] it looks as if it works
console.log(sortedNumbers === numbers); // true

const newSortedNumbers = numbers.toSorted();
console.log(newSortedNumbers === numbers); // false

const numbers2 = [10, 2, 8, 1, 23, 9, 7];
numbers2.sort();
console.log(numbers2); // [1, 10, 2, 23, 7, 8, 9] the order happens by ASCII table

// We need to pass to sort a compare function, so it knows how to compare two elements

numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 8, 7, 2, 1]

const cars = ['BMW', 'Mercedes', 'Audi', 'audi', 'Toyota'];

cars.sort();
console.log(cars); // ['Audi', 'BMW', 'Mercedes', 'Toyota', 'audi']

cars.sort((a, b) => a.localeCompare(b));
console.log(cars); // ['audi', 'Audi', 'BMW', 'Mercedes', 'Toyota']

cars.sort((a, b) => b.localeCompare(a));
console.log(cars); // ['Toyota', 'Mercedes', 'BMW', 'Audi', 'audi']
