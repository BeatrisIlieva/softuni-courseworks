function solve(text, searched) {
    let counter = 0;

    let words = text.split(' ');

    for (let word of words) {
        if (word === searched) {
            counter++;
        }
    }

    console.log(counter);
}

solve('This is a word and it also is a sentence', 'is');
