function sayHi() {
    console.log(`Hello my name is ${this.name}!`); // this refers to the global context
    console.log(this); // global {global: global, clearImmediate: ƒ, setImmediate: ƒ, clearInterval: ƒ, clearTimeout: ƒ, …}
}

// Invoke global function
sayHi(); // Hello my name is undefined!
// in the global context there is no property called name

this.name = 'John'; // here this refers to the module
sayHi(); // Hello my name is undefined!
console.log(this); // {name: 'John'}

// compared to the Browser, in Node.js we have an additional context - module
// each file has its own module
