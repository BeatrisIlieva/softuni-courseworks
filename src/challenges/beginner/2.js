// "use strict";

// // The find() method returns the first found value that satisfies the testing function or undefined if such element does not exist

// const elements = [1, 6, 9];

// const foundElement = elements.find(function (el) {
//   return el > 1 && el < 9;
// });

// //expected 6
// console.log(foundElement);

"use strict";

export const description =
  "The find() method returns the first found value that satisfies the testing function or undefined if such element does not exist";

export const sourceCode = `
const elements = [1, 6, 9];

const foundElement = elements.find(function (el) {
  return el > 1 && el < 9;
});
`;

export const selectionOptions = [1, 9, 6];

export const correctAnswer = "6";
