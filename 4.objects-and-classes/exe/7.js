function solve(input) {
    const result = input
        .toLowerCase()
        .split(' ')
        .reduce((acc, curr) => {
            if (!acc.hasOwnProperty(curr)) {
                acc[curr] = 0;
            }

            acc[curr] += 1;

            return acc;
        }, {});

    const filteredResult = Object.entries(result)
        .filter(([word, count]) => count % 2 !== 0)
        .map(([word, count]) => word)
        .join(' ');
        
    console.log(filteredResult);
}

solve('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');
