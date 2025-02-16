const cat = {
    name: 'Navcho',
    makeSound: function () {
        console.log('Meow');
    },
    play: () => console.log('Playing'),
    bite(value) {
        console.log(`Biting ${value}`);
    },
    owner: {
        name: 'Beatris',
    },
};

// get all property names of an object
const propertyNames = Object.keys(cat);
console.log(propertyNames);
// ['name', 'makeSound', 'play', 'bite', 'owner']

//get all property values
const propertyValues = Object.values(cat);
console.log(propertyValues);
// ['Navcho', ƒ, ƒ, ƒ, {…}]

// get object key value pairs
const entries = Object.entries(cat);
console.log(JSON.stringify(entries));
// array of arrays
// [["name","Navcho"],["makeSound",null],["play",null],["bite",null],["owner",{"name":"Beatris"}]]


// new method
const someKeyValues = [
    ['age', 29],
    ['firstName', 'Pesho'],
];
const someObj = Object.fromEntries(someKeyValues);
console.log(someObj);


// delete entry

delete cat.bite
console.log(cat);