/* 
    In JS the values have types not the variables
    - string literal '' to define a string 
    - array literal [] to define an array
    - object literal {} to define an object
    - just a digit 5 to define number
    - true/false to define a boolean

    Thus, the interpreter understands what the type is from the literal

    The variable is a just a container for the value.
 */

/*
    Seven primitive data types (value types):
        1. String (immutable)
        2. Number
        3. Boolean
        4. Null
        5. Undefined
        6. BigInt
        7. Symbol (unique and immutable)

        Both the variables and the VALUES of the primitive data types 
        are stored in the execution context that is in the CALLSTACK;

        Callstack is a memory dedicated for the execution of the program;
        
*/



let word = 'some'; // A string is created in memory; the variable word points to it
let num = 5; // A number is created in memory; the variable num points to it

word = 'some2'; // A new string is created in memory; The original string is not modified
              // 'some' is no longer referenced so it can be garbage collected
num = 6; // The number 5 is replaced with 6

console.log(word); // some2
console.log(num); // 6


const a = 10;
const b = '2';
const c = 'asd';
let result = 0;

result = a + b;
// Type coercion converts the number 10 to string
console.log(result, typeof result); // 102 string

// Type coercion converts the string 2 to number
result = a - b;
console.log(result, typeof result); // 8 number

// The results are such because we use the '+' sign to concatenate strings.
// Subtraction between strings is not possible.
// That's why the type coercion converts the string to number
// when we try to subtract a string from a number

result = a + c;
console.log(result, typeof result); // 10asd string

result = a - c;
console.log(result, typeof result); // NaN number

/* 
    Reference data types (structure types):
        1. Objects
        2. Arrays (they are also objects)
        3. Functions (they are also objects)
*/

