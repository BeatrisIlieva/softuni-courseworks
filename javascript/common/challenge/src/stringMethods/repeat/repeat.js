"use strict";

// The repeat() method creates a new string repeated n number of times

const string = "*";

const count = 3;

for (let index = 0; index <= count; index++) {
  console.log(string.repeat(index));
}

// expected
// *
// **
// ***
