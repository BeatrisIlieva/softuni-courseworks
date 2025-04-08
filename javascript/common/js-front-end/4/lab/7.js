function solve(input) {
    const result = input.reduce((acc, curr) => {
        const [name, address] = curr.split(':');

        acc[name] = address;

        return acc;
    }, {});

    const sortedResult = Object.keys(result).sort((keyA, keyB) => {
        return keyA.localeCompare(keyB);
    });

    sortedResult.forEach(name => console.log(`${name} -> ${result[name]}`));
}

solve(['Tim:Doe Crossing', 'Bill:Nelson Place', 'Peter:Carlyle Ave', 'Bill:Ornery Rd']);
