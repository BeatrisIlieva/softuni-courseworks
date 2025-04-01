/*
    Function constructor allows creation of objects.
    they are not factory functions ( function that creates and returns a new instance of an object)
*/

// 3 ways to create a new instance of an object (except using the object literal):

// 1. factory function
// 2. class
// 3. function constructor

// function constructor - it is written in pascal case (if we see something written in pascal
// case we should invoke it with the keyword 'new' )

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.sing = function () {
        console.log('My angel of music');
    }; // every time a new function is created in memory 
      // and we assign it to the current object that we create

    function sing() {
        console.log('My angel of music');
    }
}

// add method to prototype
Person.prototype.efficientSing = function() {
    console.log(`${this.firstName}, sing for me.`)
}

// the prototype of the function will become prototype of every object that
// is created through that function
// the objects will automatically inherit the method 

// exactly that is the idea behind the 'prototype' property ->
// it holds an object that assigns the function as a prototype to all objects
// that are created from the function

const person1 = new Person('John', 'Doe'); // 'this' refers to person1
const person2 = new Person('Steven', 'Evens'); // 'this' refers to person2

console.log(person1); // Person {firstName: 'John', lastName: 'Doe'}
console.log(person2); // Person {firstName: 'Steven', lastName: 'Evens'}

// there is a problem here
person1.sing(); // My angel of music
person2.sing(); // My angel of music


// different functions
console.log(person1.sing === person2.sing); // false

// function has a prototype
console.log(Person.prototype); // {constructor: ƒ} 

person1.efficientSing(); // John, sing for me.
person2.efficientSing(); // Steven, sing for me.
console.log(person1.efficientSing === person2.efficientSing); // true

// new keyword
function newOperator(constructor, ...args) {
    // create new object
    const newObj = {};

    // Assign prototype
    Object.setPrototypeOf(newObj, constructor.prototype);

    // execute constructor with newObj as context
    constructor.apply(newObj, args);

    // return new object
    return newObj;
}

const person3 = newOperator(Person, 'Brian', 'Smith');
console.log(person3); // Person {firstName: 'Brian', lastName: 'Smith', sing: ƒ}
person3.efficientSing(); // Brian, sing for me.


