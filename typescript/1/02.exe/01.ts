function isConvertibleToNumber(param: unknown): boolean {
    return !Number.isNaN(Number(param));
}

function optionalMultiplier(
    param1?: string | number,
    param2?: string | number,
    param3?: string | number
): number {
    const numbers = [];
    if (isConvertibleToNumber(param1)) {
        numbers.push(Number(param1));
    }

    if (isConvertibleToNumber(param2)) {
        numbers.push(Number(param2));
    }

    if (isConvertibleToNumber(param3)) {
        numbers.push(Number(param3));
    }

    let result = 1;

    for (let num of numbers) {
        result *= num;
    }

    return result;
}

console.log(optionalMultiplier('3', 5, '10'));
console.log(optionalMultiplier('2', '2'));
console.log(optionalMultiplier(undefined, 2, 3));
console.log(optionalMultiplier(7, undefined, '2'));
console.log(optionalMultiplier());
