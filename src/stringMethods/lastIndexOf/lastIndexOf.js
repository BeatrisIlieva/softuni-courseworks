"use strict";

// The lastIndexOf() method returns the last index at which a searched an element is found; if a search element is not found, it returns -1

const sentence = "Beautiful Brazilian sky";

const foundIndex = sentence.lastIndexOf("B");

// expected 10
console.log(foundIndex);

const notFoundIndex = sentence.lastIndexOf("p");

// expected -1
console.log(notFoundIndex);
