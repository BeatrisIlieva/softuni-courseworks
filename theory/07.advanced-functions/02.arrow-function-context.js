const person = {
    name: 'Brian',
    saySomething() {
        const sayHiArrow = () =>
            console.log(`Hi my name is ${this.name}!`); // Hi my name is Brian!
        // upon creation arrow function takes as context the context of 
        // the outer function -> the object person
        sayHiArrow();

        function sayHi() {
            console.log(`Hi my name is ${this.name}!`); // Hi my name is undefined!
        }

        sayHi(); 
    }
};

person.saySomething();

// Invoke as inner arrow function of method
const sayHiArrow = () => console.log(`Hi my name is ${this.name}!`);

const thirdPerson = {
    name: 'Brian',
    saySomething() {
        sayHiArrow();
    }
};

thirdPerson.saySomething(); // Hi my name is undefined!

this.name = 'John';

thirdPerson.saySomething(); // Hi my name is John!
// because the context of the arrow function becomes the module

const anotherPerson = {
    name: 'Michel',
    sayName(){
        console.log(`${this.name}`);
    },
    sayNameArrow: () => console.log(`${this.name}`)
}

anotherPerson.sayName(); // Michel
anotherPerson.sayNameArrow(); // John
