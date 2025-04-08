"use strict";

// The includes() method returns true if an elements exists in a given string or false respectively

const sentence = "I love summer";

const doesInclude = sentence.includes("summer");

// expected true
console.log(doesInclude);

const doesNotInclude = sentence.includes("winter");

// expected false
console.log(doesNotInclude);
