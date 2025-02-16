function solve(x, y) {
    let result = '';
    let sum = 0;

    for (let i = x; i <= y; i++) {
        result += i + ' ';
        sum += i;
    }
    console.log(result);
    console.log(`Sum: ${sum}`);
}

solve(5, 10);
