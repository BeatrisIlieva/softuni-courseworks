const car = {
    name: 'Toyota'
};

Object.defineProperty(car, 'year', {
    value: 2000,
    writable: false, // the property becomes read only
    enumerable: true,
});

console.log(car); // {name: 'Toyota', year: 2000}
console.log(car.year); // 2000
car.year = 2010;
console.log(car.year); // 2000

// set another object as non writable property
const store = {
    name: 'Toyota Bulgaria',
}

Object.defineProperty(car, 'store', {
    value: store,
    writable: false,
    enumerable: true,
});

console.log(car.store); // {name: 'Toyota Bulgaria'}
car.store = {};
console.log(car.store); // {name: 'Toyota Bulgaria'}
car.store.name = 'Something else';
console.log(car.store); // {name: 'Something else'}
console.log(store); // {name: 'Something else'}

// CONCLUSION: we cannot change the reference but we can change by reference
