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
    Seven primitive (value types) data types:
        1. String (immutable)
        2. Number
        3. Boolean
        4. Null
        5. Undefined
        6. BigInt
        7. Symbol (unique and immutable)
*/


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
