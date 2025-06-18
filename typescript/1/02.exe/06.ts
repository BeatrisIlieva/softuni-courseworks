let names = {
    fName: 'John',
    lName: 'Doe',
    age: 22,
    getPersonInfo() {
        return `${this.fName} ${this.lName}, age ${this.age}`;
    }
};

let location2 = {
    city: 'Boston',
    street: 'Nowhere street',
    number: 13,
    postalCode: 51225,
    getAddressInfo() {
        return `${this.street} ${this.number}, ${this.city} ${this.postalCode}`;
    }
};

type namesType = typeof names;
type locationType = typeof location2;

function createCombinedFunction(names: namesType, location: locationType) {
    return function (person: namesType & locationType) {
        console.log(`Hello, ${person.getPersonInfo()} from ${person.getAddressInfo()}`);
    };
}

let combinedFunction = createCombinedFunction(names, location2);
let combinedPerson = Object.assign({}, names, location2);
combinedFunction(combinedPerson);
