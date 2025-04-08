"use strict";

// The padStart() method adds to the start of a given string a substring until a specified length is reached

const text = "030";

const result = text.padStart(5, "0");

// expected "00030"

console.log(result);
