function extractAndConvertToUpper(input) {
    const words = input.match(/\w+/g);

    const upperCaseWords = words.map((word) => word.toUpperCase());

    console.log(upperCaseWords.join(', '));
}

solve('Hi, how are you?');
