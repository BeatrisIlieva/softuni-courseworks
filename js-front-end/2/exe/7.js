function solve(word, sentence) {
    const pattern = new RegExp(`\\b${word}\\b`, 'i');
    const wordFound = sentence.match(pattern);

    return console.log(wordFound ? word : `${word} not found!`);
}

solve('javascript', 'JavaScript is the best javascript programming language');
