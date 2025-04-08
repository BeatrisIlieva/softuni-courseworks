function solve(input) {
    const obj = input.reduce((acc, curr) => {
        acc[curr] = curr.length;

        return acc;
    }, {});

    for (let key in obj) {
        console.log(`Name: ${key} -- Personal Number: ${obj[key]}`);
    }
}

solve(['Silas Butler', 'Adnaan Buckley', 'Juan Peterson', 'Brendan Villarreal']);
