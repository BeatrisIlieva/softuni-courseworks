function solve(input) {
    const result = input.reduce((acc, curr) => {
        [key, value] = curr.split(' ');

        acc[key] = value;

        return acc;
    }, {});

    for (let key in result) {
        console.log(`${key} -> ${result[key]}`);
    }
}

solve(['Tim 0834212554', 'Peter 0877547887', 'Bill 0896543112', 'Tim 0876566344']);
