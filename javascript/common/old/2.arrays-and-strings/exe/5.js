function solve(words, text) {
    const wordsList = words.split(', ');
    let splitText = text.split(' ');

    for (let i = 0; i < splitText.length; i++) {
        for (const word of wordsList) {
            const pattern = new RegExp(
                `(?<=\\s|^)\\*{${word.length}}(?=\\s|$)`
            );

            const match = text.match(pattern);

            if (splitText[i] === match[0]) {
                splitText[i] = word;
            }
        }
    }

    console.log(splitText.join(' '));
}

solve(
    'great, learning',
    'softuni is ***** place for ******** new programming languages *****'
);
