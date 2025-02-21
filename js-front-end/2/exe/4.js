function solve(array) {
    const sortedArray = array.sort((a, b) => a - b);

    const result = [];

    while(sortedArray.length > 0){
        const minNumber = sortedArray.shift();
        const maxNumber = sortedArray.pop();

        result.push(minNumber, maxNumber);
    }
    return result;
}

console.log(solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));
// result [-3, 65, 1, 63, 3, 56, 18, 52, 31, 48]

