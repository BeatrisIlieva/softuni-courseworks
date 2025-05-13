function isSumEven(a: number, b: number, c: number): boolean {
    const sumOfNumbers = a + b + c;

    if (sumOfNumbers % 2 === 0) {
        return true;
    }

    return false;
}

console.log(isSumEven(2, 2, 3));
