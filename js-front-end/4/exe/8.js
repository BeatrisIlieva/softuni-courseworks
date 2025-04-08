function solve(input) {
    let result = input.reduce((acc, curr) => {
        const [command, number] = curr.split(', ');

        command == 'IN' && acc.add(number);

        command == 'OUT' && acc.has(number) && acc.delete(number);

        return acc;
    }, new Set());

    result = [...result];

    console.log(
        result.length > 0
            ? result.sort((a, b) => a.localeCompare(b)).join('\n')
            : 'Parking Lot is Empty'
    );
}

solve([
    'IN, CA2844AA',
    'IN, CA2844AA',
    'IN, CA1234TA',
    'IN, CA1234Tc',
    'IN, CA1234Tc',

    'OUT, CA2844AA',

    'OUT, CA1234TA'
]);
