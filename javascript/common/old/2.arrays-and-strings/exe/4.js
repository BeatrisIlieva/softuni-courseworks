function solve(numbers) {
    let sortedNumbers = numbers.sort((a, b) => a - b);
    const step = 2;

    for (let i = 0; i < numbers.length; i += step) {
        const currentBiggestNumber = sortedNumbers.pop();

        sortedNumbers.splice(i + 1, 0, currentBiggestNumber);
    }

    return sortedNumbers;
}

console.log(solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));
