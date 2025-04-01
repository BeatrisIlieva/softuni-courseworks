// freeze means that we cannot set any properties to an object; after freezing
// only enumerable is true, writable and configurable are false;
// we cannot delete properties
// we use freeze when we want to make sure that the object would not be modified at runtime

const car = {
    model: 'Toyota',
    year: 2000,
};

console.log(Object.getOwnPropertyDescriptors(car));
// {
//     model: {
//       value: 'Toyota',
//       writable: true,
//       enumerable: true,
//       configurable: true
//     },
//     year: { value: 2000, writable: true, enumerable: true, configurable: true }
// }

Object.freeze(car);

car.year = 2020;
console.log(car); // {model: 'Toyota', year: 2000}
console.log(Object.getOwnPropertyDescriptors(car));
// {
//     model: {
//       value: 'Toyota',
//       writable: false,
//       enumerable: true,
//       configurable: false
//     },
//     year: {
//       value: 2000,
//       writable: false,
//       enumerable: true,
//       configurable: false
//     }
// }

car.newProperty = 'new value';
console.log(car); // {model: 'Toyota', year: 2000}
// the property is not being added

delete car.year;
console.log(car); // {model: 'Toyota', year: 2000}
// we cannot delete properties

// seal
// only enumerable is true and writable, configurable is false;
// we cannot delete properties
// it allows us to change properties
// it does not allow us to delete properties
const person = {
    name: 'Peter',
    age: 20,
}

Object.seal(person);

// can rewrite property values
person.name = 'Steven';
console.log(person); // {name: 'Steven', age: 20}

//cannot delete properties
delete person.name;
console.log(person); // {name: 'Steven', age: 20}

// cannot add new properties
person.newProp = 'new value';
console.log(person);  // {name: 'Steven', age: 20}