// Non mutating
// most often we use it when we want to aggregate the array to one value

let numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((acc, curr, index) => acc + curr, 0);

console.log(sum);
