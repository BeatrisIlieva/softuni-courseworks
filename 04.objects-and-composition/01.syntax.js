const cat = {
    //propertyName: propertyValue
    name: 'Daisy',
    age: 1,
    isMale: false
};

// set new property
cat.eyeColor = 'Amber';
console.log(cat);

// shorthand syntax
const firstName = 'John';
const person = {
    firstName,
    age: 20
};

// access property with dot notation
console.log(person.firstName);

// access property value with bracket notation
console.log(person['firstName']);

// access property value with bracket notation using variable
const dynamicPropertyName = 'firstName';
console.log(person[dynamicPropertyName]);

// set property name that does not apply to identifier rules
const employee = {
    'first-name': 'Steven'
};

console.log(employee['first-name']);

// object destructuring assignment
// in array destructuring it is important the order
// in object destructuring it is important the name
// in array destructuring if we keep the order, we can name the variables whatever we want
// in object destructuring the names must be as they are
// rest operator
const { age, ...rest } = cat;
console.log(age, rest);

// delete property
const simpleObj = { first: 1, second: 2 };
delete simpleObj.first;

console.log(simpleObj);

// reference value
// we create a new variable that points to the same object
const anotherObj = simpleObj;
console.log(simpleObj === anotherObj); // true
const simpleObj2 = { second: 2 };
console.log(simpleObj === simpleObj2); // false
simpleObj.second = 20;
console.log(anotherObj); // {second: 20}

// use dynamic property name in object literal
const propName = 'isEco';

const house = {
    color: 'Pink',
    isMultiFamily: true,
    [propName]: true
};

console.log(house);