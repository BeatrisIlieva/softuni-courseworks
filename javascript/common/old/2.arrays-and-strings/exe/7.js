function solve(word, string) {
    const pattern = new RegExp(`(?<=\\s|^)${word}(?=\\s|$)`, 'i');

    const match = string.match(pattern);

    if (match) {
        return console.log(word);
    }

    console.log(`${word} not found!`);
}

solve(
    'javascript',

    'JavaScriptjj is the best programming language'
);
