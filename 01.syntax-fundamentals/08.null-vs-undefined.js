/* 
    we use undefined when we plan to define value in the future;
    in practice we declare a variable without initializing it
*/

let futureValue;
console.log(futureValue); // undefined
console.log(typeof futureValue); // undefined

// console.log(anotherFutureValue); ReferenceError: anotherFutureValue is not defined(not declared)

// not defined !== undefined

/*
    We use it when we mean to say that currently the value is currently missing,
    however it will be defined in the future
    Null means defined nothing;
 */

let futureObj = null;
console.log(futureObj); // null

setTimeout(() => {
    futureObj = { existing: true };
    console.log(futureObj); // {existing: true}
}, 1000);

setTimeout(() => {
    console.log(typeof undefined); // undefined
    console.log(typeof null); // object

    // So we can say that null is a missing reference to an object

    console.log(null == undefined); // true
    console.log(null === true); //false
}, 2000);
