"use strict";

// The filter() method creates a new array with filtered elements

const elements = [1, 6, 9, 2, 13];

const filteredElements = elements.filter(function (el) {
  return el > 1 && el < 9;
});

//expected [6, 2]
console.log(filteredElements);
