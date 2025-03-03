// When logical AND if the left side is truthy it will return the right value
console.log(true && false);
// false

console.log(true && 'John');
// John

// When logical AND if the left side is falsy it will return the left value
console.log(false && 'John');
// false


// When logical OR if the left part if truthy it will return the left
console.log(true || 'John');
// true

// When logical OR if the left part if falsy it will return the right
console.log(false || 'John');
// John

console.log('Steven' || 'John');
