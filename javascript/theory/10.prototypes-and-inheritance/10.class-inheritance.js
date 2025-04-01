// Class inheritance -> child classes extend parent classes;
// Child classes inherit properties and methods from its parent
// Child class can add or replace existing properties and methods

class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class Teacher extends Person {
    constructor(name, email, subject) {
        super(name, email);
        this.subject = subject;
    }

    teach() {
        console.log('teaching');
    }
}

const teacher = new Teacher('John', 'john@gmail.com', 'Literature');
console.log(teacher);
// Teacher {name: 'John', email: 'john@gmail.com', subject: 'Literature'}
console.log(teacher instanceof Teacher); // true
console.log(teacher instanceof Person); // true

// instance of check the prototype

const teacher2 = new Teacher('Michel', 'michel@gmail.com', 'Mathematics');

console.log(teacher.teach === teacher2.teach); // true
