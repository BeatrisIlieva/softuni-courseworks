/* 
    Variable scope defines where a variable lives;
    Block is the content between curly brackets {};
    The inner scope has access to everything outside;
    The outer scope does not have access to the variables in the inner scope;
    
*/

let c = 3;

function outer() { // block start
    const a = 1;
    // console.log(b); ReferenceError: b is not defined

    function inner() { // block start
        console.log(a); // 1

        console.log(c); // 3
        
        const b = 2;
    } // block start

    // console.log(b); ReferenceError: b is not defined

    inner();
} // block start

outer();