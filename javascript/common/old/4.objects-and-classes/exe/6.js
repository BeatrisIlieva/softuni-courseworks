function solve(input) {
    const searchedWords = input
        .shift()
        .split(' ')
        .reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {});

    for (let word of input) {
        if (searchedWords.hasOwnProperty(word)) {
            searchedWords[word]++;
        }
    }

    Object.entries(searchedWords)
        .sort((a, b) => b[1] - a[1])
        .forEach(([word, count]) => console.log(`${word} - ${count}`));
}

solve([
    'this sentence',

    'In',
    'this',
    'sentence',
    'you',
    'have',

    'to',
    'count',
    'the',
    'occurrences',
    'of',

    'the',
    'words',
    'this',
    'and',
    'sentence',

    'because',
    'this',
    'is',
    'your',
    'task',
]);
