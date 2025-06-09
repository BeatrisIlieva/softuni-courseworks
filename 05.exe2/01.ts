export {};

function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Function ${methodName} called with arguments:${args.join(', ')}`);

        originalMethod.apply(this, args);
    };

    return descriptor;
}

class Person {
    public fName: string;
    public lName: string;

    constructor(fName: string, lName: string) {
        this.fName = fName;
        this.lName = lName;
    }

    @log
    static getFullname(firstName: string, lastName: string) {
        return `${firstName} ${lastName}`;
    }
}

Person.getFullname('name', 'name');
