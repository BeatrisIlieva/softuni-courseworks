function solve(input) {
    const data = input.reduce((acc, curr) => {
        const obj = JSON.parse(curr);
        const [key, value] = Object.entries(obj)[0];

        acc[key] = value;

        return acc;
    }, {});

    Object.entries(data)
        .sort(([keyA, valueA], [keyB, valueB]) =>
            keyA.localeCompare(keyB)
        )
        .forEach(([term, definition]) =>
            console.log(`Term: ${term} => Definition: ${definition}`)
        );
}

solve([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'
]);
