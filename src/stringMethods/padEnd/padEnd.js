"use strict";

// The padEnd() method adds to the start of a given string a substring until a specified length is reached

const text = "030";

const result = text.padEnd(5, "0");

// expected "03000"

console.log(result);
