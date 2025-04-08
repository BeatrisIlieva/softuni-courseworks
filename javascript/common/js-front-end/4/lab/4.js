function solve(firstName, lastName, hairColor) {
    const obj = JSON.stringify({ name: firstName, lastName, hairColor });

    console.log(obj);
}

solve(
    'George',
    'Jones',

    'Brown'
);
