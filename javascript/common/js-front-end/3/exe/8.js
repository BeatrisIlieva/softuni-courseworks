function solve(num) {
    const positiveDivisors = [];

    for (let i = 1; i < num; i++) {
        num % i == 0 && positiveDivisors.push(i);
    }

    const sum = positiveDivisors.reduce((acc, curr) => acc + curr);

    console.log(sum == num ? 'We have a perfect number!' : "It's not so perfect.");
}

solve(7);
