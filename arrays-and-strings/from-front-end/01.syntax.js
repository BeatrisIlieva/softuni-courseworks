// Declare an empty array
const empty = [];

// dynamically add elements to an array and change its length
empty[0] = 1;
empty[1] = 2;

console.log(!![]); // true

const numbers = [1, 2, 3, 4, 5];
// Change array by reference
numbers[0] = 0; // const does not allow to assign a new value or reference
// however it allows us to change by reference

console.log(numbers); // [0, 2, 3, 4, 5]

// To change by reference means, that we go into the callstack,
// we see the reference pointing to the address of the object in memory
// and we change some of the values inside the object

let numbers2 = [1, 2, 3, 4, 5];
numbers2 = [];
console.log(numbers2); // []

const numbers3 = [1, 2, 3, 4, 5];
try {
    // To change a reference means to assign a new reference
    // const prevents us to assign new a reference to an object
    // or to assign a new value to a primitive
    numbers3 = [];
} catch (err) {
    console.log(err.name, err.message); // TypeError Assignment to constant variable.
}

/*
    The elements in an array are not necessarily in a sequential order

    IN JS arrays are not guaranteed to be DENSE. They are SPARSE

    Dense array means that even if there are empty spots in the array, 
    the space in memory is still consumed for them

    In sparse arrays no memory is allocated for empty spots
*/

const names = ['first', 'second', 'third'];
names.length = 20;

// this is the current length of the array, not the one with which it was create
const namesLength = names.length;

console.log(namesLength); // 20
names.length = 3;
console.log(names.length);

console.log(names[21]); // undefined

// Array destructuring assignment
const newNumbers = [1, 2, 3, 4, 5];
let [firstNum, secondNum, ...rest] = newNumbers;
console.log(firstNum);
console.log(secondNum);
console.log(rest);

const array = [1, 2, 3, 4, 5];
const length = array.length;

array.length = 10;

console.log(array.length); // 10
console.log(length); // 5