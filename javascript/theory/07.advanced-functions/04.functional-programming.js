function execute(operation, operandA, operandB) {
    const result = operation(operandA, operandB);

    console.log(result);
}

// First class function -> the function is passed as an argument to execute
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

execute(sum, 1, 2); // 3
execute(subtract, 1, 2) // -1

// Higher order function -> a function that either accepts another function as a parameter
// or return another function as result or both
function greetingBuilder(greeting, title) {
    return (name) => console.log(`${greeting}, ${title} ${name}!`)
}

const greeting = greetingBuilder('Hello', 'Mr.');
greeting('Steven'); // Hello, Mr. Steven!

// Function predicate
const isOdd = (number) => console.log(number % 2 !== 0);
isOdd(8); // false

// Pure function
const divide = (a, b) => console.log(a / b);
divide(4, 2); // 2
// every time the function is called with 4 and 2, it will return 2