function solve(array) {
    const sortedArray = array.sort((a, b) => a - b);

    const middleIndex = Math.floor(sortedArray.length / 2);

    return sortedArray.slice(middleIndex);
}

console.log(solve([3, 19, 14, 7, 2, 19, 6]));
