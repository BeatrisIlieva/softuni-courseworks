// object literal {}
// the keys are strings
// it is not obligatory to put the keys in string literals if they are a Standard Identifier
// in JS we use identifiers for functions, variables and object properties

let person = { 'full-name': 'Pesho Ivanov', name: 'Pesho', age: 20 }; // person is an identifier
// if the identifier is not standard we must use string literals
function sayHi() {
    // sayHi is an identifier
    console.log('Hi');
}

// the rules for a standard identifier :
// - alphanumeric [A-Za-z0-9_]
// - they must not start with a digit

// use dot syntax to get property value
console.log(person.name);
console.log(person['full-name']);

// use bracket syntax to get property value; must use string literals
console.log(person['age']);

// create an empty object and dynamically add values
let animal = {};

// Add with dot syntax
animal.name = 'Navcho';
// It dynamically creates the key and the value and if the key name already exists it will
// reassign it

// Add with bracket syntax
animal['min-wight'] = 5;

// Add dynamic name property
let propName = 'type';
animal[propName] = 'cat';

console.log(animal);
//{name: 'Navcho', min-wight: 5, type: 'cat'}

// Add dynamic name property in literal
const dynamicPropName = 'fullName';

const person3 = {
    [dynamicPropName]: 'Ivan Ivanov',
};

console.log(person3);

// Object literal with shorthand syntax
// it takes a variable with a name as the given key and takes its value
// const shortPerson = {
//     firstName,
//     lastName,
//     age,
// };

// Object Destructuring assignment

const newPerson = { name: 'Alex', age: '28', grade: 6 };
const { name: newName, age: newAge, grade } = newPerson;
console.log(newName, newAge, grade);

// Object Destructuring assignment with rest
const secondNewPerson = { name: 'Alex', age: '28', grade: 6 };
const { name: newName2, ...restInfo } = secondNewPerson;
console.log(JSON.stringify(newName2));
console.log(JSON.stringify(restInfo));
