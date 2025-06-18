function optionalMultiplier(
    a?: number | string,
    b?: number | string,
    c?: number | string
): number {
    let startValue = 1;

    const numbers = [a, b, c].filter((x) => x !== undefined);

    numbers.forEach((x) => (startValue *= Number(x)));

    return startValue;
}

console.log(optionalMultiplier('3', 5, '10'));
console.log(optionalMultiplier('2', '2'));
console.log(optionalMultiplier(undefined, 2, 3));
console.log(optionalMultiplier(7, undefined, '2'));
console.log(optionalMultiplier());
