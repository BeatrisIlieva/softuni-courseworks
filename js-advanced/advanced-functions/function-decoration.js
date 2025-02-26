// partial application

function sayHi(title, greeting, name) {
    return `${greeting} ${title} ${name}, my name is ${this.name}`;
}

const context = {
    name: 'Pesho'
};

const partialApplicationGreeting = sayHi.bind(context, 'Mr.');
const result = partialApplicationGreeting('Hi', 'Gosho');
console.log(result);

//

const greetPerson = (title, name) => {
    return `Hi, ${title}, ${name}`;
};

// using function wrapper
const greetMr = name => greetPerson('Mr.', name);

const res = greetMr('Pesho');

console.log(res);

// using bind
const greetMrs = greetPerson.bind(null, 'Mrs.');
const res2 = greetMrs('Ivana');

console.log(res2);
