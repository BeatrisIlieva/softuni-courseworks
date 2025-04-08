function solve(data) {
    const result = data.reduce((acc, curr) => {
        const [name, address] = curr.split(':');

        acc[name] = address;

        return acc;
    }, {});

    Object.entries(result)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .forEach(([key, value]) => console.log(`${key} -> ${value}`));
}

solve(['Tim:Doe Crossing', 'Bill:Nelson Place', 'Peter:Carlyle Ave', 'Bill:Ornery Rd']);
