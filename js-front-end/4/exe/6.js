function solve(input) {
    const allWords = [...input];
    const searchedWords = allWords.shift().split(' ');

    const wordsByCount = searchedWords.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {});

    allWords.forEach(word => {
        wordsByCount.hasOwnProperty(word) && (wordsByCount[word] += 1);
    });

    Object.entries(wordsByCount)
        .sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA)
        .forEach(([word, count]) => console.log(`${word} - ${count}`));
}

solve([
    'is the',
    'first',
    'sentence',
    'Here',
    'is',
    'another',
    'the',
    'And',
    'finally',
    'the',
    'the',
    'sentence'
]);
