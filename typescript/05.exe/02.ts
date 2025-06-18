function setterRangeValidator(minValue: number, maxValue: number) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;

        descriptor.set = function (value: number) {
            if (value < minValue || value > maxValue) {
                const capitalizedPropertyName =
                    propertyName.charAt(0).toUpperCase() + propertyName.slice(1);

                throw new Error(
                    `${capitalizedPropertyName} must be between ${minValue} and ${maxValue}`
                );
            }

            return originalSetter?.call(this, value);
        };

        return descriptor;
    };
}

class Age {
    private _age!: number;
    constructor(age: number) {
        this.age = age;
    }

    @setterRangeValidator(1, 200)
    set age(val: number) {
        this._age = val;
    }
    get age() {
        return this._age;
    }
}

let ageVal = new Age(10);
ageVal.age = -10;
