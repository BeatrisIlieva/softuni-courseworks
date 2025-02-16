function solve(numbers, rotations) {
    for (let i = 0; i < rotations; i++) {
        firstNumber = numbers[0];

        for (let i = 1; i < numbers.length; i++) {
            numbers[i - 1] = numbers[i];
        }

        numbers.length = numbers.length - 1;
        numbers[numbers.length] = firstNumber;
    }

    console.log(numbers.join(' '));
}

solve([51, 47, 32, 61, 21], 2);
// 32 61 21 51 47
