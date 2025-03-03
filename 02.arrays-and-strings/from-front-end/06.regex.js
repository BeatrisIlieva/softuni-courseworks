const text = 'I am JavaScript developer, javascript is awesome';

// regex literal
const pattern = /JavaScript/gi;

// regex function constructor
const pattern2 = new RegExp('JavaScript', 'ig');

// exec() and test() are methods on the pattern (regex)

// match(), matchAll(), search(), replace(), replaceAll(), split() - this are string methods
// that use regular expression

// test()
console.log(pattern.test(text)); // true

// exec()
// exec() keeps track of where the last
// match was found and the next time continues to search from that point

let match = pattern2.exec(text); // ['JavaScript', index: 5, input: 'I am JavaScript developer, JavaScript is awesome', groups: undefined]

while (match !== null) {
    match = pattern2.exec(text); // ['javascript', index: 27, input: 'I am JavaScript developer, JavaScript is awesome', groups: undefined]
    console.log(match);
}

// match()
console.log(text.match(pattern)); // ['JavaScript', 'javascript']

const allMatches = text.matchAll(pattern); // returns an iterator
[...allMatches].forEach(match => console.log(match[0]));

// JavaScript
// javascript

// Regex with a variable

const sentence = 'I love baby cats and all cats.';
const searchedWord = 'cats';

const pattern3 = new RegExp(`${searchedWord}`, 'ig');

const catMatches = sentence.matchAll(pattern3);

[...catMatches].forEach(match => console.log(match));
// ['cats', index: 12, input: 'I love baby cats and all cats.', groups: undefined]
// ['cats', index: 25, input: 'I love baby cats and all cats.', groups: undefined]

const sentence2 = 'I love baby cats and all cats.';
const searchedWord2 = 'cats';

const pattern4 = new RegExp(`${searchedWord}`, 'ig');

const result = sentence.replaceAll(pattern4, 'dog');

console.log(result); // I love baby dog and all dog.
