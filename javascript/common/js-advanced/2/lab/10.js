function solve(matrix) {
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < matrix.length; i++) {
        primaryDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][matrix.length - 1 - i];
    }

    console.log(`${primaryDiagonalSum} ${secondaryDiagonalSum}`);
}

solve([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89],
]);
