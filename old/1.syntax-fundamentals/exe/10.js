function solve(number) {
    let digitsAreEqual = true;
    let sum = 0;
    let currentDigit;

    while (number > 0) {
        result = number % 10;

        sum += result;

        number = parseInt(number / 10);

        if (currentDigit === undefined) {
            currentDigit = result;
            continue;
        }

        if (currentDigit !== result) {
            digitsAreEqual = false;
        }
    }

    console.log(digitsAreEqual);
    console.log(sum);
}

solve(1234);
