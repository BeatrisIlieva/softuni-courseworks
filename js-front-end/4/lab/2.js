function solve(input) {
    for (let key in input) {
        console.log(`${key} -> ${input[key]}`);
    }
}

solve({
    name: 'Plovdiv',

    area: 389,

    population: 1162358,

    country: 'Bulgaria',

    postCode: '4000'
});
