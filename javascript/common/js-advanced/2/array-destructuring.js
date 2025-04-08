const names = ['Pesho', 'Gosho', 'Stamat', 'Mariyka'];

// Array destructuring assignment
const [firstName, secondName] = names;
console.log(firstName);
console.log(secondName);

// Array destructuring assignment with rest operator
const [fName, ...others] = names;
console.log(fName);
console.log(others);
