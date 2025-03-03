/*
    Strings are immutable -> once the string is created it cannot be changed;
    All string methods return a new string
*/

let name = 'John';
name[0] = 'G';

console.log(name); // John

name = 'Philip';

console.log(name); // Philip

const text = 'Hi ' + 'there'; // concatenation
console.log(text);

// indexOf()
const sentence = 'I love cats cats';
const catIndex = sentence.indexOf('cats');
console.log(catIndex); // 7
const dogIndex = sentence.indexOf('dogs');
console.log(dogIndex); // -1

// lastIndexOf()
const lastCatIndex = sentence.lastIndexOf('cats');
console.log(lastCatIndex); // 12

// substring()
const substring = sentence.substring(7, 11); // 7 inclusive, 11 exclusive
console.log(substring); // cats

// replace()
const newSentence = sentence.replace('I', 'You');
console.log(newSentence); // You love cats cats

sentence.replace('cats', 'fish');
console.log(sentence); // I love cats cats

// replaceAll()
const newReplaceAll = sentence.replaceAll('cats', 'dogs');
console.log(newReplaceAll); // I love dogs dogs

// split()
// gets a string and makes an array from it
const array = sentence.split(' ');
console.log(array); // ['I', 'love', 'cats', 'cats']

// includes()
console.log(sentence.includes('cats')); // true

// repeat()
const word = ' * ';
const repeatedWord = word.repeat(10);

console.log(repeatedWord); //  *  *  *  *  *  *  *  *  *  *
console.log(repeatedWord.endsWith(' ')); // true

// trim()
console.log(repeatedWord.trim()); // *  *  *  *  *  *  *  *  *  *
console.log(repeatedWord.trim().endsWith(' ')); // false

const number = '10';
console.log(number.padStart(10, 0)); // 0000000010
console.log(number.padEnd(10, 0)); // 1000000000

// reverse a string
const someStr = 'abcdefg';
const reversedStr = someStr.split('').reverse().join('');
console.log(reversedStr); // gfedcba
