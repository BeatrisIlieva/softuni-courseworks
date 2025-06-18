type Names2 = {
    fName: string;
    lName: string;
    age: number;
    getPersonInfo(): string;
};

type Location22 = {
    city: string;
    street: string;
    number: number;
    postalCode: number;
    getAddressInfo(): string;
};

function createCombinedFunction2(names: Names2, location: Location22) {
    return function (person: Names2 & Location22) {
        console.log(`Hello, ${person.getPersonInfo()} from ${person.getAddressInfo()}`);
    };
}

let names2 = {
    fName: 'John',
    lName: 'Doe',
    age: 22,
    getPersonInfo() {
        return `${this.fName} ${this.lName}, age ${this.age}`;
    }
};

let location22 = {
    city: 'Boston',
    street: 'Nowhere street',
    number: 13,
    postalCode: 51225,
    getAddressInfo() {
        return `${this.street} ${this.number}, ${this.city} ${this.postalCode}`;
    }
};

let combinedFunction2 = createCombinedFunction2(names2, location22);
let combinedPerson2 = Object.assign({}, names2, location22);
combinedFunction2(combinedPerson2);
