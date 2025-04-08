function solve(firstChar, secondChar) {
    const sortedChars = [firstChar, secondChar].sort();

    const start = sortedChars[0].charCodeAt(0);
    const end = sortedChars[1].charCodeAt(0);

    const result = [];

    for (let i = start + 1; i < end; i++) {
        result.push(String.fromCharCode(i));
    }

    console.log(result.join(' '));
}

solve(':', '#');
