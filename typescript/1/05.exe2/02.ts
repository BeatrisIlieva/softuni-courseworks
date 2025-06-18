function ValidateAge(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalSetter = descriptor.set;

    descriptor.set = function (value: number) {
        if (value < 1 || value > 200) {
            throw new Error('Invalid age');
        }

        originalSetter?.call(this, value);
    };

    return descriptor;
}

class Age {
    private _age!: number;

    constructor(age: number) {
        this.age = age;
    }

    @ValidateAge
    set age(val: number) {
        this._age = val;
    }

    get age() {
        return this._age;
    }
}

let ageVal = new Age(10);
ageVal.age = 11;