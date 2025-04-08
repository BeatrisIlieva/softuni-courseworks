"use strict";

// The splice() method modifies an array as follows:

const array = [1, 3, 4, 5];

// inserts at the first index by removing zero elements:

array.splice(1, 0, 2);

// expected [1, 2, 3, 4, 5]
console.log(array);
console.log(array.length);

// replaces one element at the third index:

array.splice(3, 1, 8);

// expected: [1, 2, 3, 8, 5]
console.log(array);
console.log(array.length);

// removes one element at the second index:

array.splice(2, 1);

// expected [1, 2, 8, 5]
console.log(array);
console.log(array.length);

// replaces the element at the second index with 10:

array.splice(2, 1, 10);

//expected [1, 2, 10, 5]

console.log(array);
console.log(array.length);
