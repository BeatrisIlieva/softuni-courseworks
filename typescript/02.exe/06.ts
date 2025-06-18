export {};

type Names = {
    fName: string;
    lName: string;
    age: number;
    getPersonInfo: () => string;
};

type Location = {
    city: string;
    street: string;
    number: number;
    postalCode: number;
    getAddressInfo: () => string;
};

type Combined = Names & Location;

function createCombinedFunction(names: Names, location: Location) {
    return function (person: Combined): void {
        console.log(`Hello, ${person.getPersonInfo()} from ${person.getAddressInfo()}`);
    };
}

let names = {
    fName: 'John',
    lName: 'Doe',
    age: 22,
    getPersonInfo() {
        return `${this.fName} ${this.lName}, age ${this.age}`;
    }
};
let location = {
    city: 'Boston',
    street: 'Nowhere street',
    number: 13,
    postalCode: 51225,
    getAddressInfo() {
        return `${this.street} ${this.number}, ${this.city} ${this.postalCode}`;
    }
};

let combinedFunction = createCombinedFunction(names, location);
let combinedPerson = Object.assign({}, names, location);
combinedFunction(combinedPerson);
