function solve(replacements, sentence) {
    replacements = replacements.split(', ');

    replacements.forEach(replacement => {
        sentence = sentence.replace('*'.repeat(replacement.length), replacement);
    });

    console.log(sentence);
}

solve('great, learning', 'softuni is ***** place for ******** new programming languages');
