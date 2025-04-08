"use strict";

export const description =
  "The filter() method creates a new array with filtered elements";

export const sourceCode = `
const elements = [1, 6, 9, 2, 13];

const filteredElements = elements.filter(function (el) {
  return el > 1 && el < 9;
};
`;

export const selectionOptions = ["[6, 2]", "[1, 2]", "[6, 13]"];

export const correctAnswer = "[6, 2]";
