function sayHi(title, name) {
    console.log(`Hi ${title} ${name}, I am ${this.name}!`);
}

const newContext = {
    name: 'John'
};

// Partial application 1
const partialApplicationSayHiToMan = sayHi.bind(newContext, 'Mr.');
const partialApplicationSayHiToWoman = sayHi.bind(newContext, 'Mrs.');

partialApplicationSayHiToMan('Steven');
partialApplicationSayHiToWoman('Sarah');

function sayHi2(title, name) {
    console.log(`Hi ${title} ${name}!`);
}

// Partial application 2
const sayHiMr = (name) => sayHi2('Mr.', name);
sayHiMr('Philip'); // Hi Mr. Philip!

const executeSayHiMrs = sayHi2.bind(null, 'Mrs.');
executeSayHiMrs('Michelle'); // Hi Mrs. Michelle!
