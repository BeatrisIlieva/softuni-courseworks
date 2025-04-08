function solve(input) {
    const data = input.split(' ');

    const result = data.reduce((acc, curr) => {
        const word = curr.toLowerCase();

        if (!acc.has(word)) {
            acc.set(word, 0);
        }

        acc.set(word, acc.get(word) + 1);

        return acc;
    }, new Map());

    const resultToPrint = [];

    result.forEach(
        (count, word) => count % 2 !== 0 && resultToPrint.push(word)
    );

    console.log(resultToPrint.join(' '));
}

solve('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');
