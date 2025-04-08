function solve(string) {
    const obj = JSON.parse(string);

    for (let key in obj) {
        console.log(`${key}: ${obj[key]}`);
    }
}

solve('{"name": "George", "age": 40, "town": "Sofia"}');
