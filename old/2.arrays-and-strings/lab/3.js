function solve(numbers) {
    const evenSum = numbers
        .filter((num) => num % 2 === 0)
        .reduce((acc, curr) => acc + curr, 0);

    const oddSum = numbers
        .filter((num) => num % 2 !== 0)
        .reduce((acc, curr) => acc + curr, 0);

    console.log(evenSum - oddSum);
}

solve([2, 4, 6, 8, 10]);
