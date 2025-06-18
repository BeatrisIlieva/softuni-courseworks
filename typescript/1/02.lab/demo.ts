function printSimpleGreeting(text: string | string[]): void {
    console.log(text);
    console.log(text.length);
}

printSimpleGreeting('Hi there');
printSimpleGreeting(['Hi', 'there']);

// Union type
function printGreeting(text: string | string[]): void {
    if (typeof text === 'string') {
        console.log(text);
    } else {
        console.log(text.join(' '));
    }
}

printGreeting('Hi there');
printGreeting(['Hi', 'there']);

function contactPerson(contactPerson: { name: string; email: string }): void {
    console.log(`${contactPerson.name} -> ${contactPerson.email}`);
}

contactPerson({ name: 'Daisy', email: 'daisy@mail.com' });

// Union typeof
let passOrFail: 'pass' | 'fail';
passOrFail = 'pass';
console.log(passOrFail);

let numericGrade: 1 | 2 | 3 | 4;
numericGrade = 1;
console.log(numericGrade);

// type aliases
// custom type + intersection
type Person = {
    firstName: string;
    lastName: string;
    age: number;
};

type StudentProfile = {
    school: string;
    gpa: number;
};

type FullStudent = Person & StudentProfile;

function printFullStudent(student: FullStudent): void {
    console.log(`${student.firstName} ${student.lastName} ${student.gpa}`);
}

let daisyPerson: FullStudent = {
    firstName: 'Daisy',
    lastName: 'Flex',
    age: 1,
    school: 'School',
    gpa: 6
};

// keyof

type Point = {
    x: number;
    y: number;
};

const originPoint: Point = {
    x: 1,
    y: 2
};

function changeCoordinate(point: Point, coordinate: keyof Point, newValue: number) {
    point[coordinate] = newValue;
}

changeCoordinate(originPoint, 'x', 10);

console.log(originPoint);

type Point2 = {
    x: number;
    y: number;
};

type PartialPoint2 = {
    [K in keyof Point2]?: Point2[K];
};

// interfaces

interface Animal {
    name: string;
    age: number;
    // makeSound: (soundName: string) => void;
    makeSound(soundName: string): void;
}

class Dog implements Animal {
    public name: string;
    public age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    makeSound(soundName: string): void {
        console.log(soundName);
    }
}

const dog = new Dog('Didi', 2);
dog.makeSound('bau');

interface Person2 {
    firstName: string;
    lastName: string;
    age: number;
}

interface FullStudent2 extends Person2 {
    school: string;
    gpa: number;
}
