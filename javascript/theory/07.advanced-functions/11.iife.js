// Immediately invoked function expression
// Executes only once and automatically

(function () {
    console.log('Hi');
})(); // Hi

const result = (function (name) {
    console.log('Hi ' + name);

    return `Mr. ${name}`;
})('Peter'); // Hi Peter

console.log(result); // Mr. Peter
