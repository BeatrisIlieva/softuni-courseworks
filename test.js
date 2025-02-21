function solve(obj){
    obj.a = 2
    obj = {}
    obj.b = 4
    return obj
}

const obj = {a: 1, b: 3}
const obj2 = solve(obj)
console.log(Object.is(obj, obj2));
console.log(obj);




// function solveNum(num) {
//     num = 2
//     return num
// }

// const num1 = 1;
// const num2 = solveNum(num1)
// console.log(Object.is(num1, num2));