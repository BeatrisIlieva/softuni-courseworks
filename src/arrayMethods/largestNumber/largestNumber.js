"use strict";

// Function that accepts unlimited numbers as parameters and finds the largest of them:
// Using the Spread Operator (...) to take unlimited number of parameters

function findTheLargestNumber(...input) {
  let largestNumber = 0;

  for (let index = 0; index < input.length; index++) {
    if (input[index] > largestNumber) {
      largestNumber = input[index];
    }
  }
  console.log(largestNumber);
}

findTheLargestNumber(1, 5, 9, 17, 100, 43, 7, 56, 3);
