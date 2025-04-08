"use strict";

// The slice() method does not modify the original array. It returns a shallow copy of a portion of the original array into a new array object (the first index is inclusive while the last one is exclusive):

const array = [1, 3, 4, 5];

const newArray = array.slice(1, 3);

//expected [3, 4]
console.log(newArray);
