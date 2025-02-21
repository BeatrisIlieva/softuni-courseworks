function solve(sentence, searchedWord) {
    const pattern = new RegExp(`\\b${searchedWord}\\b`, 'g');

    const result = Array.from(sentence.matchAll(pattern));

    console.log(result.length);
}

solve('softuni is great place for learning new programming languages', 'softuni');
