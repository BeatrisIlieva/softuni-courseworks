function LogClass(constructor: Function) {
    console.log('-------------');
    console.log(`Class ${constructor.name} created`);
    console.log('-------------');
}

function LogAccessor(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log('-------------');
    console.log(`Accessors for property name: ${propertyName} created`);
    console.log('-------------');
}

function LogMethod(target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log('-------------');
    console.log(`Method ${methodName} created`);
    console.log('-------------');
}

function LogProperty(target: any, propertyName: string) {
    console.log('-------------');
    console.log(`Property ${propertyName} created`);
    console.log('-------------');
}

function logParameter(target: any, methodName: string, parameterIndex: number) {
    console.log('-------------');
    console.log(`Parameter at index ${parameterIndex} for method ${methodName} created`);
    console.log('-------------');
}

@LogClass
class User {
    @LogProperty
    public name: string;
    public age: number;

    private _email!: string;

    constructor(name: string, age: number, email: string) {
        this.name = name;
        this.age = age;

        this.email = email;
    }

    @LogAccessor
    get email() {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    @LogMethod
    getInfo(@logParameter condensed: boolean): string {
        return condensed
            ? `Person ${this.name}`
            : `Person ${this.name} ${this.age} years-old with ${this._email}`;
    }
}
