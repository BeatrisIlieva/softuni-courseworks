function isSumEven(a: number, b: number, c: number): boolean {
    const sumOfNumbers = a + b + c;

    return sumOfNumbers % 2 === 0;
}

console.log(isSumEven(2, 2, 3));
