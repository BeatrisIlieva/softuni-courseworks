function solve(number) {
    const numberAsString = number.toString();
    let sum = 0;

    for (let char of numberAsString) {
        sum += Number(char);
    }

    console.log(sum);
}

solve(245678);
