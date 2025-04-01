const car = {
    name: 'Toyota'
};

// Define INTERNAL property
Object.defineProperty(car, 'model', {
    value: 'Verso',
    enumerable: true // -> model is not enumerable by default
});

// equal to
// car.model = 'Verso';

// console.log(car); // {name: 'Toyota', model: 'Verso'}

// BY DEFAULT:

// const internalProperties = Object.getOwnPropertyDescriptor(car, 'model');
// console.log(internalProperties);
// {value: 'Verso', writable: false, enumerable: false, configurable: false}

// const internalProperties2 = Object.getOwnPropertyDescriptor(car, 'name');
// console.log(internalProperties2);
// {value: 'Toyota', writable: true, enumerable: true, configurable: true}

Object.defineProperty(car, 'hidden', {
    value: 'secret',
    enumerable: false,
});

for (const propName in car) {
    console.log(propName);
    // name
    // model -> model is not enumerable by default
    // hidden is not being iterated
}

// get keys -> returns only enumerable ones
const keys = Object.keys(car);
console.log(keys); // (2) ['name', 'model']

console.log(car); // {name: 'Toyota', model: 'Verso', hidden: 'secret'}
console.log(JSON.stringify(car)); // {"name":"Toyota","model":"Verso"}
