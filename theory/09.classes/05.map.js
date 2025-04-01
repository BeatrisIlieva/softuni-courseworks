/* 
    Map is a collection that allows us to associate one value type to another value type.
     
    for example:
    number -> boolean 
    boolean -> string

    it can be iterated with for ... of

    it is like an associative array. Usually, it contains uniform data

    We would use map over object when we know that we would need to delete 
    keys often or to use the clear() method

    Reasons to use map over object:
    - frequent deletion or clear
    - different than string value type for keys
    - strict insertion order (object does not guarantee order of insertion while map does)
*/

// declare map -> creating a new instance of the class Map
let map = new Map();

// add elements to map
map.set(20, 'age');

console.log(map); // Map(1) {size: 1, age => 20} 20 is associated with age

for (const [key, value] of map) {
    console.log(typeof key); // number
    console.log(key, value); // 20 age
}

// get specific value
console.log(map.get(20)); // age

// get size
console.log(map.size); // 1

// check if key exists
console.log(map.has(20));
true;

map.delete(20);
console.log(map); // Map(0) {size: 0}

map.set(30, 'age');
console.log(map); // {size: 1, 30 => age}
map.clear();
console.log(map); // Map(0) {size: 0}

// iterators
// .entries()
// .keys()
// .values()

// Sorting
const phoneBook = new Map([
    ['Peter', '937336474'],
    ['Steven', '083737363'],
    ['John', '932354572'],
    ['Angel', '524373']
]);

const sortedEntries = Array.from(phoneBook).sort(
    ([keyA, valueA], [keyB, valueB]) => keyA.localeCompare(keyB)
);
console.log(JSON.stringify(sortedEntries)); // [["Angel","524373"],["John","932354572"],["Peter","937336474"],["Steven","083737363"]]

// convert to object
const sortedPhoneBookObj = Object.fromEntries(sortedEntries);
console.log(JSON.stringify(sortedPhoneBookObj)); // {"Angel":"524373","John":"932354572","Peter":"937336474","Steven":"083737363"}

const sortedPhoneBookMap = new Map(sortedEntries);
console.log(sortedPhoneBookMap); // Map(4) {size: 4, Angel => 524373, John => 932354572, Peter => 937336474, Steven => 083737363}