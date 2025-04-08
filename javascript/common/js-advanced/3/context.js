// method context
let person = {
    name: 'Gocho',
    introduce() {
        console.log(`Hello my name is ${this.name}`); // this refers to person; it's context is person
    },
};

person.introduce();

const introduce = person.introduce;

console.log(introduce === person.introduce); // true

introduce(); // -> Hello my name is undefined; here the method belongs to the global context
// ! in this case the context of the method is the global scope and the global scope does not have a name
globalThis.name = 'Stamat';
introduce(); // -> Hello my name is Stamat

const anotherPerson = {
    name: 'Georgi',
};

anotherPerson.greet = introduce;
anotherPerson.greet();
