// invoke global function
function sayHi() {
    console.log(this);
    console.log(`Hi my name is ${this.name}`);
}

// sayHi();
// global {global: global, clearImmediate: ƒ, setImmediate: ƒ, clearInterval: ƒ, clearTimeout: ƒ, …}
// a-function-context.js:3
// Hi my name is undefined

function outer() {
    sayHi();
    //Hi my name is undefined
}

outer();

// invoke as a method
let person = {
    name: 'Pesho',
    sayHi // this is copy by reference - we invoke one and the same function
};

person.sayHi();
// {name: 'Pesho', sayHi: ƒ}
// Hi my name is Pesho

let anotherPerson = {
    name: 'Gosho',
    saySomething() {
        sayHi();
    }
};

anotherPerson.saySomething();
// Hi my name is undefined
