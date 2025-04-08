"use strict";

// The find() method returns the first found value that satisfies the testing function or undefined if such element does not exist

const elements = [1, 6, 9];

const foundElement = elements.find(function (el) {
  return el > 1 && el < 9;
});

//expected 6
console.log(foundElement);
