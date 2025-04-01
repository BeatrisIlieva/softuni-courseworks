const car = {
    name: 'Toyota'
};

Object.defineProperty(car, 'year', {
    configurable: true, // we can later change the configuration
    writable: false,
    value: 2009,
});

console.log(car); // {name: 'Toyota', year: 2009}
car.year = 2010;
console.log(car); // {name: 'Toyota', year: 2009}

Object.defineProperty(car, 'year', {
    writable: true,
});

car.year = 2010;
console.log(car); // {name: 'Toyota', year: 2010}

// get specific internal
console.log(Object.getOwnPropertyDescriptor(car, 'year'));
// {value: 2010, writable: true, enumerable: false, configurable: true}

// get multiple internal properties
console.log(Object.getOwnPropertyDescriptors(car));
// {
//     name: {
//       value: 'Toyota',
//       writable: true,
//       enumerable: true,
//       configurable: true
//     },
//     year: {
//       value: 2010,
//       writable: true,
//       enumerable: false,
//       configurable: true
//     }
// }

// set multiple internal properties
Object.defineProperties(car, {
    color: {
        writable: true,
        value: blue,
    },
    transmissionType: {
        writable: false,
    }
})