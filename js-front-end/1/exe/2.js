function solve(input) {
    const cityRecords = input.reduce((acc, curr) => {
        const [city, population] = curr.split(' <-> ');

        const populationAsNumber = Number(population);

        if (!acc[city]) {
            acc[city] = 0;
        }

        acc[city] += populationAsNumber;

        return acc;
    }, {});

    for (record in cityRecords) {
        console.log(`${record} : ${cityRecords[record]}`);
    }
}

solve([
    'Sofia <-> 1200000',

    'Montana <-> 20000',

    'New York <-> 10000000',

    'Washington <-> 2345000',

    'Las Vegas <-> 1000000',
]);
