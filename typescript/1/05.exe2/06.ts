export {};

function ValidateName(minLength: number) {
    return function (target: any, propertyname: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (value: string) {
            if (value.length < minLength) {
                throw new Error(`name must have a min length of ${minLength} characters`);
            }

            return originalSetter?.call(this, value);
        };

        return descriptor;
    };
}

function ValidateAge(min: number, max: number) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (value: number) {
            if (value < min || value > max) {
                throw new Error(`age must be between ${min} and ${max}`);
            }

            return originalSetter?.call(this, value);
        };

        return descriptor;
    };
}

function validatePassword(pattern: RegExp) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (value: string) {
            if (!value.match(pattern)) {
                throw new Error(`password needs to match ${pattern}`);
            }

            return originalSetter?.call(this, value);
        };

        return descriptor;
    };
}

class User {
    private _name!: string;
    private _age!: number;
    private _password!: string;

    constructor(name: string, age: number, password: string) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    @ValidateName(1)
    set name(val: string) {
        this._name = val;
    }

    @ValidateAge(1, 150)
    set age(val: number) {
        this._age = val;
    }

    @validatePassword(/^[a-zA-Z0-9!@]+$/g)
    set password(val: string) {
        this._password = val;
    }

    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
}

// let user = new User('John', 130, 'hardPassword12');
// let user2 = new User('John', 30, '!test');
// let user3 = new User('John', 25, '@werty');
// let user4 = new User('Jo', 20, 'password123');

let user = new User('John', 130, 'hardPassword12');
let user2 = new User('John', 30, '!test');
let user3 = new User('John', 25, '@werty');
let user4 = new User('Jo', 20, 'password123');