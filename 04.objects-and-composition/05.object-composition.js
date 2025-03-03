/*
    Object composition happens when we combine reference data types -> object inside objects,
    arrays inside objects, objects inside arrays, arrays inside arrays.
    Object composition allows us to reuse code. It is considered superior to OOP inheritance.

    In object Composition, objects are described by what they DO, not by what they ARE.
*/

const student = {
    firstName: 'John',
    lastName: 'Doe',
    age: 21,
    courses: { 'JS Advanced': 6.0, 'Django Basics': 6.0 }
};

// !!! the 'student' variable holds a reference to the address in memory where the object
// is located. The variable 'courses' points to another object which is 
// also of reference data type. The property-name 'courses' in this case is 
// located in the Heap. The property-name 'courses' points to 
// another place is the Heap where the object
// { 'JS Advanced': 6.0, 'Django Basics': 6.0 } is located.

console.log(student.courses); // {JS Advanced: 6, Django Basics: 6}
console.log(student.courses['JS Advanced']); // 6

// Composing objects with behavior
// Since currently this is undefined because it refers to the global object
// We can conclude that the functions are meant to be composed
// and used as methods of an object

function print() {
    console.log(`${this.name} is printing page.`);
}

function scan() {
    console.log(`${this.name} is scanning page.`);
}

const printer = {
    name: 'Printer',
    print,
};

const scanner = {
    name: 'Scanner',
    scan,
}

const copier = {
    name: 'Copier',
    print,
    scan,
}

printer.print(); // Printer is printing page.
scanner.scan(); // Scanner is scanning page.
copier.print(); // Copier is printing page.
copier.scan(); // Copier is scanning page.