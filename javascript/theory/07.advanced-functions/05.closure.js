// In the CALLSTACK are arranged one over another the execution contexts of the functions
// on the bottom is the global context - the module

// what happens when we get a variable from outer scope:

function outer() {
    let name = 'Peter';

    function inner() {
        console.log(name); // here the variable name is accessed
        // through the execution context of the function 'outer'
        // which is below the execution context of the function 'inner'
        // the closure of the function 'inner' is 'outer'
        // in the closure there is 'name = Peter'

        // the 'inner' function holds a reference to the variable 'name'
        // this gives a signal to the garbage collector not to delete 
        // the reference to the variable 'name'
        // so the variable 'name' gets copied into the Heap
        // so the variable 'name' now stays in the Heap as a closure
    }

    inner();
}

outer(); // Peter

// Higher order function
function outer2() {
    let name = 'John';

    return function inner() {
        console.log(name); // here the outer function has already returned so
        // it's execution context is not anymore in the callstack;
        // the garbage collector has cleared the variable 'name'
        // however the variable name lives in the closure of the 'inner' function
        // the closure of the 'inner' function is 'outer'
        // the closure keeps a reference to the variable ' name'
    };
}

const innerFunction = outer2();
innerFunction(); // John
