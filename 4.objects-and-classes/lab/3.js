function solve(string) {
    const convertedStr = JSON.parse(string);

    Object.entries(convertedStr).forEach(([key, value]) => console.log(`${key}: ${value}`));
}

solve('{"name": "George", "age": 40, "town": "Sofia"}');
