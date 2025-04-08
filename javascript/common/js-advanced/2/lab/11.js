function solve(matrix) {
    let countOfPair = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length - 1; j++) {
            if (matrix[i][j] === matrix[i][j + 1]) {
                countOfPair += 1;
            }
        }
    }

    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === matrix[i + 1][j]) {
                countOfPair += 1;
            }
        }
    }

    return countOfPair;
}

console.log(
    solve([
        [2, 2, 5, 7, 4],
        [4, 0, 5, 3, 4],
        [2, 5, 5, 4, 2],
    ])
);
