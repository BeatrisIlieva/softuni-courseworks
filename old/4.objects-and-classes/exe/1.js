function solve(data) {
    // const result = data.reduce((acc, curr) => {
    //     acc[curr] = curr.length;

    //     return acc;
    // }, {});

    const result = data.reduce((acc, curr) => ({ ...acc, [curr]: curr.length }), {});

    for (let el in result) {
        console.log(`Name: ${el} -- Personal Number: ${result[el]}`);
    }
}

solve(['Silas Butler', 'Adnaan Buckley', 'Juan Peterson', 'Brendan Villarreal']);
