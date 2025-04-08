function solve(array) {
    let maxNumber = -Infinity;

    for (let i = 0; i < array.length; i++) {
        const nestedArray = array[i];
        const nestedArrayLength = nestedArray.length;

        for (let j = 0; j < nestedArrayLength; j++) {
            let currentNumber = nestedArray[j];

            if (currentNumber > maxNumber) {
                maxNumber = currentNumber;
            }
        }
    }

    return maxNumber;
}

console.log(
    solve([[3, 5, 7, 12], [-1, 4, 33, 2], [8, 3, 0, 4]])
);
