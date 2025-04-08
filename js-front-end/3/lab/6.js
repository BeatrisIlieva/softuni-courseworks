function solve(a, b, c) {
    const multiplyFirst = (a, b) => a * b;
    const multiplySecond = (a, c) => a * c;

    const firstCoupleResult = multiplyFirst(a, b);
    const secondCoupleResult = multiplySecond(firstCoupleResult, c);

    const result = secondCoupleResult >= 0 ? 'Positive' : 'Negative';

    console.log(result);
}

solve(-5, 1, 1);
