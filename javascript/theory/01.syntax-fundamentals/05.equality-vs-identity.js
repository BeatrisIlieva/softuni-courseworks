/*
    == -> equality (allows coercion -> 
                    meaning that one of the two operands would be converted 
                    to the type of the another; 
                    so the interpreter checks if they are equal after coercion
                    )

    === -> identity (does not allow coercion)
*/

console.log(1 == '1'); // true

console.log(1 === '1'); // false
