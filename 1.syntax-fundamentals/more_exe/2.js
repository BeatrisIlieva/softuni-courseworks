function solve(string) {
    const words = string.match(/[A-Za-z]+/g);

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].toUpperCase();
    }

    console.log(words.join(', '));
}

solve('Hi, how are you?');
