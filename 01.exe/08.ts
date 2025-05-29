function isNonEmptyStringArray(arg: unknown): arg is string[] {
    return (
        Array.isArray(arg) &&
        arg.length >= 1 &&
        arg.every((el) => typeof el === 'string')
    );
}

let arr: unknown = ['12', '13'];

if (isNonEmptyStringArray(arr)) {
    console.log(arr.length);
}

// console.log(customTypeGuard({}));
// console.log(customTypeGuard({ test: 'one' }));
// console.log(customTypeGuard([]));
// console.log(customTypeGuard(undefined));
// console.log(customTypeGuard(null));
// console.log(customTypeGuard([12, 13]));
// console.log(customTypeGuard(['test', 123]));
// console.log(customTypeGuard(['a', 'b', 'c']));
