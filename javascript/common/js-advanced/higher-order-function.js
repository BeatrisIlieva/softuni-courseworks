function greetingBuilder(greeting, title){
    return (name) => {
        console.log(`${greeting} ${title} ${name}`);
    }
}

const formalGreeting = greetingBuilder('Hello', 'Mr.');
formalGreeting('Pesho')
const casualGreeting = greetingBuilder('Hi', 'my friend');
casualGreeting('Ivan')