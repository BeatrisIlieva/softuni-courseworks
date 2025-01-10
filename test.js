const string = 'WN498 Las vegas';
const result = string.indexOf(' ');
console.log(result);
const number = string.substring(0, result)
const destination = string.substring(result + 1)
console.log(number.length);
console.log(destination.length);