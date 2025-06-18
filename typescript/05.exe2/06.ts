export {}

function ValidateName(minLength: number) {
    return function (target: object, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (val: string) {
            if (val.length < minLength) {
                throw new Error(`name must have a min length of ${minLength} characters`);
            }

            return originalSetter?.call(this, val);
        };
        
        return descriptor;
    };
}

function ValidateAge(min: number, max: number) {
    return function (target: object, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (val: number) {
            if (val < min || val > max) {
                throw new Error(`age must be between ${min} and ${max}`);
            }

            return originalSetter?.call(this, val);
        };
        return descriptor;
    };
}

function ValidatePassword(pattern: RegExp) {
    return function (target: object, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (val: string) {
            if (!val.match(pattern)) {
                throw new Error(`password needs to match ${pattern}`);
            }

            return originalSetter?.call(this, val);
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

    @ValidateName(3)
    set name(val: string) {
        this._name = val;
    }

    @ValidateAge(1, 100)
    set age(val: number) {
        this._age = val;
    }

    @ValidatePassword(/^[a-zA-Z0-9]+$/g)
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

// minLength = 3
// min = 1, max = 100
// regex = /^[a-zA-Z0-9]+$/g
let user = new User('John', 130, 'hardPassword12');
let user2 = new User('John', 30, '!test');
let user3 = new User('John', 25, '@werty');
let user4 = new User('Jo', 20, 'password123');
