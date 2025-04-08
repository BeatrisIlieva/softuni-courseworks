function solve(array) {
    const sortedArray = array.sort((a, b) => a - b);

    const firstTwoSmallestNumbers = sortedArray.slice(0, 2);

    return firstTwoSmallestNumbers.join(' ');
}

console.log(solve([30, 15, 50, 5]));
