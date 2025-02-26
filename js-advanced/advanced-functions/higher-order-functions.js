function execute(operation, operandA, operandB) {
    const result = operation(operandA, operandB);

    console.log(result);
}

const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

execute(sum, 1, 2); // 3

function greetingBuilder(greeting, title) {
    return name => {
        return `${greeting}, ${title} ${name}`;
    };
}

const formalGreeting = greetingBuilder('Hello', 'Mr.');
const result = formalGreeting('Peter')
console.log(result);
