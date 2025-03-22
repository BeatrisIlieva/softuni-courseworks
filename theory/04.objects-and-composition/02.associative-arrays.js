/*
    In JS we use objects to create associative arrays. In associative arrays, in comparison
    to arrays, we do not use indices to access a value but a key. Generally, 
    in associative array we have a string as a key that corresponds to a value. 
    In associative arrays we have uniform data. For example, telephone book ->
    a person name is associated it their phone number. 
    The difference between an ordinary object and associative array is that within an
    ordinary object we have mixed data, while in associative array we have uniform data.

    In the base case, we use the for ... in loop to iterate an associative array because
    it contains uniform data and using a single key we can iterate to get each value
*/

const phoneBook = {
    'John Doe': '94746548509595',
    'Peter Pan': '94746548509585',
    'John Smith': '94746548509575'
};

console.log(phoneBook['Peter Pan']);

// on each iteration the name would be different
// using the bracket syntax allows us through the name to dynamically get the value
for (const name in phoneBook) {
    console.log(`${name} -> ${phoneBook[name]}`);
}

// iterate with Object.values()
// Object.values() give us as an array all the values
const values = Object.values(phoneBook);
values.forEach(value => console.log(`${value}`));

// iterate with Object.keys()
// Object.keys() give as an array that contains nested arrays with each key-value pair
const keys = Object.keys(phoneBook);
keys.forEach(key => console.log(`${key} -> ${phoneBook[key]}`));

// iterate with Object.entries()
// Object.entries() give as an array that contains nested arrays with each key-value pair
const keyValuePairs = Object.entries(phoneBook);
keyValuePairs.forEach(([key, value]) =>
    console.log(`${key} -> ${value}`)
);

for (const [key, value] of keyValuePairs) {
    console.log(`${key} -> ${value}`);
}
