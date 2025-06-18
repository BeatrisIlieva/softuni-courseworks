function convertArrays(stringArray: string[]): [string, number] {
    const concatenatedString = stringArray.join('');
    const stringLength = concatenatedString.length;

    return [concatenatedString, stringLength];
}

console.log(convertArrays(['How', 'are', 'you?']));
console.log(
    convertArrays([
        'Today',
        ' is',
        ' a ',
        'nice',
        ' ',
        'day for ',
        'TypeScript'
    ])
);
