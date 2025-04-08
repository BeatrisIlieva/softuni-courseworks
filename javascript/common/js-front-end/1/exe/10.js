function solve(number) {
    const digits = number
        .toString()
        .split('')
        .map(num => Number(num));

    const areSame = digits.every(digit => digit === digits[0]);
    
    const sum = digits.reduce((acc, curr) => acc + curr, 0);

    console.log(areSame);
    console.log(sum);
}

solve(229);
