export {};

function MinLengthValidator(minLength: number) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (value: string) {
            if (value.length < minLength) {
                const capitalizedPropertyName = capitalizePropertyName(propertyName);

                throw new Error(
                    `${capitalizedPropertyName} must have a min length of ${minLength} characters`
                );
            }

            originalSetter?.call(this, value);
        };

        return descriptor;
    };
}

function RangeValidator(min: number, max: number) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (value: number) {
            const capitalizedPropertyName = capitalizePropertyName(propertyName);

            if (value < min || value > max) {
                throw new Error(
                    `${capitalizedPropertyName} must be between ${min} and ${max}`
                );
            }

            return originalSetter?.call(this, value);
        };

        return descriptor;
    };
}

function RegexValidator(pattern: RegExp) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (value: string) {
            if (!value.match(pattern)) {
                const capitalizedPropertyName = capitalizePropertyName(propertyName);

                throw new Error(`${capitalizedPropertyName} needs to match ${pattern}`);
            }

            originalSetter?.call(this, value);
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

    @MinLengthValidator(3)
    set name(val: string) {
        this._name = val;
    }

    @RangeValidator(1, 100)
    set age(val: number) {
        this._age = val;
    }

    @RegexValidator(/^[a-zA-Z0-9]+$/g)
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

function capitalizePropertyName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// let user = new User('John', 130, 'hardPassword12');
// let user2 = new User('John', 30, '!test');
// let user3 = new User('John', 25, '@werty');
let user4 = new User('Jo', 20, 'password123');
