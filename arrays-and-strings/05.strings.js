/*
    Strings are immutable -> once the string is created it cannot be changed
*/

let name = 'Pesho';
name[0] = 'G';

console.log(name); // Pesho

name = 'Gosho';

console.log(name); // Gosho

const text = 'Hi ' + 'there'; // concatenation
console.log(text);

// indexOf

const sentence = 'I love cats cats';
const catIndex = sentence.indexOf('cats');
console.log(catIndex); // 7
const dogIndex = sentence.indexOf('dogs');
console.log(dogIndex); // -1
const lastCatIndex = sentence.lastIndexOf('cats');
console.log(lastCatIndex); // 9
