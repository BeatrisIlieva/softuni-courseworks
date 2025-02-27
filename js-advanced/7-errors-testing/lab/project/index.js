import { func } from 'calculator'; // with setting type module in package.json
// const { func } = require('calculator');

var f = func('f(x) = x*10 - 20');
console.log(f(3));
