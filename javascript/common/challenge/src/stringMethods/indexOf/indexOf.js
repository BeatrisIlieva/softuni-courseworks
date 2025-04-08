"use strict";

// The indexOf() method returns the starting index at which a searched string is found; if a search string is not found, it returns -1

const sentence = "I love cats.";

const foundIndex = sentence.indexOf("cats");

// expected 7
console.log(foundIndex);

const notFoundIndex = sentence.indexOf("Cats");

// expected undefined
console.log(notFoundIndex);
