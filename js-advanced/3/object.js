const cat = {
    // the entire key-value is called property
    // the key is called property name
    // the value is called property value
    name: 'Daisy',
    age: 1,
    isFemale: true,
};

// dynamic setting of a property
cat.yeeColor = 'Green';

console.log(cat);

const firstName = 'Pesho';
let obj = {
    firstName,
    'last-name': 'Ivanov',
    age: 20,
};

// access property with dot notation
console.log(obj.firstName);

// access property value with bracket notation
console.log(obj['firstName']);

// access property value with bracket notation using variable
let dynamicPropertyName = 'firstName';
console.log(obj[dynamicPropertyName]);

console.log(obj['last-name']);

// Object destructuring assignment
let { name, age } = cat;
console.log(name, age);

// Rest operator
let { isFemale, ...rest } = cat;

console.log(isFemale, rest);

const simpleObject = { first: 1, second: 2 };
delete simpleObject.first;
console.log(simpleObject);

// Reference value
let anotherObject = simpleObject;
// we create a new variable that points to the same object in memory that simple object points to

// use dynamic property name in object literal
let propName = 'isEco';
let house = {
    color: 'Pink',
    [propName]: true,
};

console.log(house);