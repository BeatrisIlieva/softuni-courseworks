// join()
// joins the elements in an array into a string without modifying the array

const cars = ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda'];

// slice()
// get a part from an array without modifying it
const middleCars = cars.slice(1, 3); // middleCars is a new array with a new reference
console.log(middleCars); // ['Audi', 'Mercedes']

const endCars = cars.slice(1);
console.log(endCars); // ['Audi', 'Mercedes', 'Toyota', 'Honda']

// create a shallow copy
const carsCopy = cars.slice();
console.log(carsCopy); // ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda']

const carsCopy2 = [...cars];
console.log(carsCopy2); // ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda']

console.log((cars === carsCopy) === carsCopy2); // false

const otherCars = cars;
console.log(otherCars === cars); // true

// includes()
// checks if an element exists in an array
const isIncluded = cars.includes('Toyota');
console.log(isIncluded); // true

// checks if element exists after a specific index
const isIncludedAt = cars.includes('Toyota', 4);
console.log(isIncludedAt); // false because it is at the third index

// indexOf()
// finds the index of an element
const indexOfToyota = cars.indexOf('Toyota');
console.log(indexOfToyota); // 3

const nonExistingIndex = cars.indexOf('nothing');
console.log(nonExistingIndex); // -1

const fishAnimal = 'fish';
const animals = ['cat', 'dog', 'mouse', fishAnimal];

// find()
// it returns the element
// we need to pass to find() a predicate -> function that returns true or false
// we need to pass to find() method a predicate function as an argument
const fish = animals.find((element, index) => element == 'fish');
console.log(fish); // fish
console.log(fish === fishAnimal); // true

// With it includes() we receive boolean
// With indexOf() we receive index
// With find() we receive on element
// With filter() we receive multiple elements

const animalNamesContainingLetterS = animals.filter(element =>
    element.includes('s')
); // ['mouse', 'fish']

const animalNamesContainingLetterSExpr = animals.filter(function (
    el
) {
    return el.includes('s');
}); // ['mouse', 'fish']

console.log(animalNamesContainingLetterS); // ['mouse', 'fish'];

// Find all indices
const topCars = ['Toyota', 'Audi', 'Toyota', 'BMW'];
let tIndex = topCars.indexOf('Toyota'); // 0

while (tIndex >= 0) {
    console.log(tIndex);
    const nextIndex = tIndex + 1;
    console.log(nextIndex); // it searches while the next index becomes -1
    tIndex = topCars.indexOf('Toyota', nextIndex);
}
