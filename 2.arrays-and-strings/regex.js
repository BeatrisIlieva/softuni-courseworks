
let text = 'I am JavaScript developer JavaScript';

// RegExp literal
let pattern = /JavaScript/; // case sensitive
let patternInsensitive = /javascript/ig; // case insensitive

// RegExp function constructor
let pattern2 = new RegExp('JavaScript', 'i');

// test pattern
console.log(pattern.test(text));

// exec pattern we need to call it again for the next occurrence
// it knows where to start from after the first time
console.log(patternInsensitive.exec(text));
console.log(patternInsensitive.exec(text));