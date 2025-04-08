function solve(obj) {
    Object.entries(obj).forEach(([key, value]) => console.log(`${key} -> ${value}`));
}

solve({
    name: 'Plovdiv',

    area: 389,

    population: 1162358,

    country: 'Bulgaria',

    postCode: '4000',
});
