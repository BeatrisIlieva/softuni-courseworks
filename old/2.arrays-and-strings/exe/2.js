function solve(numbers, step) {
    let result = [];

    for (let i = 0; i < numbers.length; i++) {
        if (i % step === 0) {
            result.push(numbers[i]);
        }
    }

    return result;
}

console.log(solve(['dsa', 'asd', 'test', 'tset'], 2));
