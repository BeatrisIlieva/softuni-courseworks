// Function Declaration
function log() {
    console.log('Some text');
} // Statement

// Function Invocation
log();

// Function expression
const log2 = function () {
    console.log('Some text');
}; // Expression

// to the variable log2 the function expression is assigned

log2();

// Arrow function
const log3 = () => {
    console.log('Some text');
}; // Expression

log3();

const log3Copy = log3; // we copy the reference of the function
console.log(log3Copy === log3); // true
