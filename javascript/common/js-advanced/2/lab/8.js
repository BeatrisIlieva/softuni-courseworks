function solve(array) {
    const result = [];

    array.forEach((num, index) => {
        if (index % 2 !== 0) {
            result.push(num * 2);
        }
    });

    return result.reverse();
}

console.log(solve([10, 15, 20, 25]));
