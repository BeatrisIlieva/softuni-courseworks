// partial application

function sayHi(title, greeting, name){
    return `${greeting} ${title} ${name}, my name is ${this.name}`;

}

const context = {
    name: 'Pesho',
};


const partialApplicationGreeting = sayHi.bind(context, 'Mr.');
const result = partialApplicationGreeting('Hi', 'Gosho');
console.log(result);
