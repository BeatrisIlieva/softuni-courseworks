function solve(number) {
    let divisorsSum = 0;

    for (let i = number - 1; i >= 0; i--) {
        if (number % i === 0) {
            divisorsSum += i;
        }
    }

    if (divisorsSum === number) {
        console.log('We have a perfect number!');
    } else {
        console.log(`It's not so perfect.`);
    }
}

solve(1236498);
