function solve(input) {
    const result = input.reduce((acc, curr) => {
        const [command, number] = curr.split(', ');

        if (command === 'IN' && !acc[number]) {
            acc[number] = true;
        } else if (command === 'OUT' && acc[number]) {
            delete acc[number];
        }

        return acc;
    }, {});

    const resultIsEmpty = Object.keys(result).length === 0;

    if (resultIsEmpty) {
        return console.log('Parking Lot is Empty');
    }

    Object.entries(result)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([number, _]) => console.log(number));
}

solve(['IN, CA2844AA', 'IN, CA1234TA', 'OUT, CA2844AA', 'OUT, CA1234TA']);
