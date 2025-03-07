// Define a class
class Cat {
    // method that accepts parameters and attaches them to the object
    constructor(name) {
        // property
        this.name = name; // this is the variable that comes as a parameter
        // that is passed as an argument upon instantiation
    }

    // within a class we can only use method notation
    // Define instance method
    sleep() {
        // this - this instance sleep
        // this refers to the current instance
        console.log(`${this.name} Zzzz`);
    }

    eat() {
        console.log(`${this.name} is eating`);
    }

    // Define static method
    // Static method is a method that executes over the class not over the instance
    static staticMethod() {
        // in a static method 'this' refers to the class
        console.log(
            `This can be called only through the class ${this.name}`
        );
    }

    // static method does not have access to instance methods but it has access
    // to other static methods
    static secondStaticMethod() {
        try {
            console.log(this.sleep());
        } catch (err) {
            console.log(err.message); // this.sleep is not a function
        }
    }
}

// in JS classes are written in Pascal case; this way it suggests
// us that it should be created using the keyword 'new'
// new is an operator that creates a new object of a given class

// Create an instance of a class -> myCat is an instance;
const myCat = new Cat('Daisy'); // here 'this' is myCat
console.log(myCat); // Cat {name: 'Daisy'}
console.log(typeof myCat); // object
console.log(myCat instanceof Cat); // true

console.log(myCat['name']); // Daisy
console.log(myCat.name); // Daisy

const yourCat = new Cat('Tom'); // here 'this' is yourCat
console.log(yourCat.name); // Tom

// call instance method -> function that belongs to an object
// we call it an instance method because we invoke it through the instance
myCat.sleep(); // Daisy Zzzz
yourCat.sleep(); // Tom Zzzz

try {
    Cat.sleep();
} catch (err) {
    console.log(err.message); // Cat.sleep is not a function
}

myCat.eat(); // Daisy is eating

// object cat has the same shape as the class Cat
const cat = {
    name: 'copyCat',
    sleep() {
        console.log(`${this.name} Zzzz`);
    },
    eat() {
        console.log(`${this.name} is eating`);
    }
};
// the question here is not if the
// two are one and the same but if cat has been created through the class Cat
console.log(cat instanceof Cat); // false -> not created from Cat

try {
    myCat.staticMethod();
} catch (err) {
    console.log(err.message); // myCat.staticMethod is not a function
}

Cat.staticMethod(); // This can be called only through the class Cat
Cat.secondStaticMethod();