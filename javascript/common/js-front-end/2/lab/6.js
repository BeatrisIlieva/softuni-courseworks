function solve(sentence, wordToReplace) {
    const replacer = '*'.repeat(wordToReplace.length);
    sentence = sentence.replaceAll(wordToReplace, replacer);

    console.log(sentence);
}

const sentence = 'A small sentence with some words';
const result = solve(sentence, 'small');
