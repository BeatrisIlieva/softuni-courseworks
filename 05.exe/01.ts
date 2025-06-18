function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Function '${methodName}' called with arguments: ${args.join(', ')}`);
        return originalMethod.call(this, args);
    };

    return descriptor;
}

class Person {
    public lName: string;
    public fName: string;

    constructor(fName: string, lName: string) {
        this.fName = fName;
        this.lName = lName;
    }

    @log
    public static getFullName(fName: string, lName: string) {
        return `${fName} ${lName}`;
    }
}

let person = new Person('John', 'Does');
Person.getFullName(person.fName, person.lName)
console.log(Person.getFullName('Benny', 'Tres'))
