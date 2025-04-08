function solve(number) {
    const isOdd = (num) => num % 2 !== 0;

    const numberAsString = number.toString();

    let oddSum = 0;
    let evenSum = 0;

    for (const el of numberAsString) {
        if (isOdd(el)) {
            oddSum += Number(el);
        } else {
            evenSum += Number(el);
        }
    }

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}

solve(1000435);
