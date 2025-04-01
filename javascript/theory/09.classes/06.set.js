/* 
    A set is a collection of unique values
*/

// declare set
const uniqueNumbers = new Set();

// Add values to set
uniqueNumbers.add(1);
uniqueNumbers.add(3);
uniqueNumbers.add(1);
uniqueNumbers.add(5);
uniqueNumbers.add(6);
uniqueNumbers.add(5);

console.log(uniqueNumbers); // Set(4) {size: 4, 1, 3, 5, 6}

console.log(uniqueNumbers.has(1)); // true yhis is more effective than list because it check with complexity 0n

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
const uniqueNumbers2 = new Set(numbers);
console.log(uniqueNumbers2); // {size: 5, 1, 2, 3, 4, 5}

// iteration
for (const element of uniqueNumbers2) {
    console.log(element);
} 

// there is no indexing
console.log(uniqueNumbers2[1]) // undefined

// create an array with unique elements
const uniqueNumbers3 = [...new Set(numbers)]; 
console.log(uniqueNumbers3); // (5) [1, 2, 3, 4, 5]