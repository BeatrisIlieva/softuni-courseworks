// let someDict = {a: {name: 'a', count: 2}, b: {name: 'b', count: 3},}

// console.log(JSON.stringify(Object.entries(someDict)));


let string = 'user1[26]';

console.log(string.indexOf('['));
const index = string.indexOf('[');
const credits = string.slice(index +1, string.length - 1)
console.log(credits);
console.log(string.substring(0, index));