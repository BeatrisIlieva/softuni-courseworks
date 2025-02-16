function solve(...chars) {
    const sortedChars = chars.sort();

    const start = sortedChars[0].charCodeAt(0);
    const end = sortedChars[1].charCodeAt(0);

    result = [];

    for (let i = start + 1; i < end; i++) {
        result.push(String.fromCharCode(i));
    }

    console.log(result.join(' '));
}

solve(
    '#',

    ':'
);
