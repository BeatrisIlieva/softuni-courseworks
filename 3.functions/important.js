// Function Declaration
// the function is just declared, it exists in memory, it waits to be invoked
// function declaration is a statement
function log() {
    console.log('Some text');
}

// Function Invocation
log();

// Function Expression
// function expression is an expression; the variable is equal
// to the function which is an expression
// this is an anonymous function because it does not have a name;
// log2 is the name of the variable
const log2 = function () {
    console.log('Some text 2');
};
// we can give it a name but that name would not be used anywhere
const logTwo = function logSecond() {
    console.log('Some text 2');
};

log2();

// logSecond();
// Error -> logSecond is not defined

const logCopy = log2;
logCopy();
//'Some text 2'

console.log(logCopy === log2);
// true

// Arrow function
const log3 = () => console.log('Some text3');

log3();

// Function declaration goes through a process called hoisting;
// Function Declaration Hoisting: Before executing the code JS firstly goes though it and if
// it sees a function declaration it declares it in the memory
// that is why a function can be invoked before it is declared
function printGrade(grade) {
    return formatText(grade);

    function formatText(grade) {
        return `Grade is ${grade}`;
    }
}

console.log(printGrade(6));

function printGrade2(grade) {
    return formatText(grade);

    const formatText = function(grade) {
        return `Grade is ${grade}`;
    }
}

console.log(printGrade(6));

// Error: Uncaught ReferenceError ReferenceError: Cannot access 'formatText' before initialization
// console.log(printGrade2(6));
