function sayHi() {
    console.log(`Hello my name is ${this.name}!`); // this refers to the global context
    console.log(this); // global {global: global, clearImmediate: ƒ, setImmediate: ƒ, clearInterval: ƒ, clearTimeout: ƒ, …}
}

// Function Invocation
sayHi(); // Hello my name is undefined!
// in the global context there is no property called name

function outer() {
    sayHi(); // Function Invocation
}

outer(); // Hello my name is undefined!

this.name = 'John'; // here this refers to the module
sayHi(); // Hello my name is undefined!
console.log(this); // {name: 'John'}

// compared to the Browser, in Node.js we have an additional context - module
// each file has its own module

// Invoke function as method
const person = {
    name: 'Peter',
    sayHi // we create a property that
    // holds the value of the function sayHi;
    // what is the value -> a reference to the function
    // here we copy the function by reference -> the reference is one and the same
    // we invoke the very same function
};

person.sayHi(); // Hello my name is Peter!
// here the function context is the object person

const anotherPerson = {
    name: 'Steven',
    saySomething() {
        console.log(this.name);
        sayHi();
    }
};

anotherPerson.saySomething();
// Steven
// Hello my name is undefined! -> sayHi is executed as normal function so the context is global
