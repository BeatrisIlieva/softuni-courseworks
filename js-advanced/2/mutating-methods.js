let cars = ['Mercedes', 'BMW', 'Audi', 'Toyota'];

// Pop:
// - removes the last element
// - returns the last element
const lastElement = cars.pop();
console.log(lastElement);

// Push
// - adds one or more elements at the end of the array
// - return the new length of the array
const newLength = cars.push('Mazda', 'Ford');
console.log(cars);
console.log(newLength);

// Shift
// - removes the first element
// - returns the first element
// - it rearranges the indices
const firstElement = cars.shift();
console.log(firstElement);

// Unshift
// - adds one or more elements at the beginning of an array
// - returns the new length
// - ir rearranges the indices
cars.unshift('Golf', 'Ferrari');
console.log(cars);

// Splice
// - at given index removes a specified count and adds new elements
// -returns the removed elements

const removedCars = cars.splice(1, 2, 'Ferrari', 'BMW');

// Fill
// Replaces the elements from start, to end index with specified new value
let numbers = [1, 2, 3, 4, 5];
// element, start, end - exclusive
numbers.fill(7, 2, 4);
console.log(numbers);
numbers.fill(0);
console.log(numbers);
// [0, 0, 0, 0, 0]

let empty = new Array(10);
// let empty = [];
// empty.length = 10;
empty.fill(0);
console.log(empty);

// Reverse
let nums = [1, 2, 3, 4, 5];
const newNums = nums.reverse();
console.log(nums);
console.log(newNums);
console.log(nums === newNums); // true

nums[nums.length - 1] = 10;
console.log(nums === newNums, 'here'); // true
console.log(newNums);



// nums and newNums point to one and the same reference in memory
// they are two variables that point to one and the same place in memory because they are reference type

let a = 5;
let b = a;
console.log(b);
console.log(a === b);
a = 6
console.log(a === b) // false;
console.log(a);
console.log(b);
