
let text = 'I am JavaScript developer JavaScript';

// RegExp literal
let pattern = /JavaScript/; // case sensitive
let patternInsensitive = /javascript/ig; // case insensitive

// RegExp function constructor
let pattern2 = new RegExp('JavaScript', 'i');

// test pattern
// console.log(pattern.test(text));

// exec pattern we need to call it again for the next occurrence
// it knows where to start from after the first time
// console.log(patternInsensitive.exec(text));
// console.log(patternInsensitive.exec(text));

// string regex methods
console.log(text.match(patternInsensitive));

const matches = text.matchAll(patternInsensitive);
for (const match of matches) {
    console.log(match)
}
console.log('-----');
// using variables
let someVariable = 'script'
let newText = 'I am JavaScript developer JavaScript'

let newPattern = new RegExp(`Java${someVariable}`, 'ig')
console.log(newPattern.test(newText));