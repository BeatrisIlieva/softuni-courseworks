function createPerson(firstName, lastName) {
    return {
        firstName,
        lastName,
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        set fullName(value) {
            const [firstName, lastName] = value.split(' ');
            this.firstName = firstName;
            this.lastName = lastName;
        }
    };
}

const person = createPerson('John', 'Smith');

console.log(person.fullName); // John Smith

person.firstName = 'George';

console.log(person.fullName); // George Smith

person.lastName = 'Peterson';

console.log(person.fullName); // George Peterson

person.fullName = 'Nikola Tesla';

console.log(person.firstName); // Nikola

console.log(person.lastName); // Tesla
