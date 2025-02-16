class Person {
    // the constructor creates an instance which is indeed an object
    constructor(firstName, lastName) {
        // this.firstName is a property name and firstName is a property value
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greet(to) {
        console.log(`${this.firstName} says hello to ${to.firstName}`);
    }
}

// new is a keyword with which we say 'create a new object using this template'
const firstPerson = new Person('Pesho', 'Peshov');
console.log(firstPerson);
//firstPerson {firstName: 'Pesho', lastName: 'Peshov'}
console.log(typeof firstPerson); // -> object
console.log(firstPerson instanceof Person); // -> true

firstPerson.greet('Gosho'); // Pesho says hello to Gosho

const secondPerson = new Person('Gosho', 'Goshev');

firstPerson.greet(secondPerson);
secondPerson.greet(firstPerson);
// Pesho says hello to Gosho
// Gosho says hello to Pesho
