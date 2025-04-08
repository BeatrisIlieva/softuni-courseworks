function solve(array) {
    const result = [];

    array.forEach(num => num >= 0 ? result.push(num) : result.unshift(num));

    return result;
}

console.log(solve([3, -2, 0, -1]));
