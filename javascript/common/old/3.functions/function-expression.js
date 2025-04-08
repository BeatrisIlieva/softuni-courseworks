// function expression
// first-class function - it can be assigned as a value to a variable

const sumNumbers = function (a, b) {
    return a + b;
};

const sumNumbersTwo = sumNumbers; // it can also be assigned to a variable this way
// it just creates a copy that points to the same place in memory

console.log(sumNumbersTwo === sumNumbers);
// true
