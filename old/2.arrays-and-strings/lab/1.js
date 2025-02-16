function solve(numbers) {
    const firstNumber = numbers.shift();

    const lastNumber = numbers.pop();

    const sum = firstNumber + lastNumber;

    console.log(sum);
}

solve([10, 17, 22, 33]);
