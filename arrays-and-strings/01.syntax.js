// Declare an empty array
const empty = [];

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
    numbers3 = [];
} catch (err) {
    console.log(err.name, err.message); // Assignment to constant variable.
}

