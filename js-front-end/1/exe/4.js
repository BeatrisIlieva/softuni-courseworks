function solve(start, end) {
    let sum = 0;
    const array = [];

    for (let i = start; i <= end; i++) {
        sum += i;
        array.push(i);
    }

    console.log(array.join(' '));
    console.log(`Sum: ${sum}`);
}

solve(0, 26);
