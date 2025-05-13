function customTypeGuard(element: any): boolean {
    if (!Array.isArray(element) || element.length < 1) {
        return false;
    }

    const itContainsOnlyStrings = element.every((el) => typeof el === 'string');

    return itContainsOnlyStrings;
}

console.log(customTypeGuard({}));
console.log(customTypeGuard({ test: 'one' }));
console.log(customTypeGuard([]));
console.log(customTypeGuard(undefined));
console.log(customTypeGuard(null));
console.log(customTypeGuard([12, 13]));
console.log(customTypeGuard(['test', 123]));
console.log(customTypeGuard(['a', 'b', 'c']));
