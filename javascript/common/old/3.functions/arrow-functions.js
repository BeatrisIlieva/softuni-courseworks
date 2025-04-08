let increment = (x) => x + 1;
// on the left side are the parameters 'x'
// on the right side is an expression which result the function will return automatically
// without the keyword return

// Arrow function statement body
const sum = (a, b) => {
    const result = a + b;

    return result;
};

// Arrow function expression body
const sum2 = (a, b) => a + b;
// the only condition is that there can be only one expression after the arrow

// Expression body arrow function with single parameter
const double = a => a * 2;
