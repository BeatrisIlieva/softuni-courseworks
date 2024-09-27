"use strict";

// Function that accepts unlimited numbers as parameters and sorts them to find the largest:
// The sort function returns either a positive, a negative number or zero

function findTheLargestNumber(...input) {
  const sortedInput = input.sort(function (a, b) {
    return a - b;
  });

  const largestNumber = sortedInput[sortedInput.length - 1];

  console.log(largestNumber);
}

findTheLargestNumber(1, 5, 9, 17, 100, 43, 7, 56, 3);
