/*
    The context of a method is the object it belongs to.
    The execution context is determined by the way the method is invoked.
    It does NOT depend on where the method is declared. 
    The execution context can be changed at runtime. 
    This refers to the current object. Which the current object is, depends 
    on how we invoke the method. The object we invoke the method through, is its 
    execution context. The context we access with the keyword 'this'.
*/

const person = {
    name: 'John',
    introduce() {
        console.log(`Hello, my name is ${this.name}.`);
    }
};

person.name = 'Peter';
// the method is executed in the context of the object person
person.introduce(); // Hello, my name is Peter.

// we assign the function as a value to the variable introduce; 
// we create a copy of the same reference
const introduce = person.introduce;
console.log(introduce === person.introduce); // true

// here the context is the global context 
// and the global context does not have a property `name`
introduce(); // Hello, my name is undefined.

globalThis.name = 'Philip';
introduce(); // Hello, my name is Philip.

globalThis.name = 'Brian';
introduce(); // Hello, my name is Brian.

const anotherPerson = {
    name: 'Steven',
}

// here the context is anotherPerson
anotherPerson.greet = introduce;
anotherPerson.greet(); // Hello, my name is Steven.

