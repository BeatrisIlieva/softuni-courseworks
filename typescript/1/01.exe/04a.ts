function convertArray(arrayOfStrings: string[]): [string, number] {
    const sentence: string = arrayOfStrings.join('');
    const sentenceLength: number = sentence.length;

    return [sentence, sentenceLength];
}

console.log(convertArray(['Today', ' is', ' a ', 'nice', ' ', 'day for ', 'TypeScript']));
