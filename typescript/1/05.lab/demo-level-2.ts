function FreezeClass(constructor: Function) {
    console.log('Freeze applied');
    console.log('-------------');

    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}

function ValidateStringAccessor(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
) {
    const originalSetter = descriptor.set;

    descriptor.set = function (value: string) {
        if (value.length < 3) {
            throw new Error('Value must be minimum 3 characters');
        }

        originalSetter?.call(this, value);
    };
    console.log('-------------');
    return descriptor;
}

function DepricatedMethod(message: string = 'Method is depricated') {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(message);

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

@FreezeClass
class User2 {
    public name: string;
    public age: number;

    private _email!: string;

    constructor(name: string, age: number, email: string) {
        this.name = name;
        this.age = age;

        this.email = email;
    }

    @ValidateStringAccessor
    get email() {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    @DepricatedMethod('This method is depricated!')
    getInfo(condensed: boolean): string {
        return condensed
            ? `Person ${this.name}`
            : `Person ${this.name} ${this.age} years-old with ${this._email}`;
    }
}

const user1 = new User2('pen4o', 20, 'pen40@mail.com');
const user2 = new User2('min40', 20, 'min40@mail.com');

console.log(Object.isFrozen(User2));
console.log(Object.isFrozen(User2.prototype));

// user1.email = 'a'

console.log(user1.getInfo(true));
