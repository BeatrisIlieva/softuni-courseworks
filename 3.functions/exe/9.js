function solve(number) {
    const loadingBar = `${number}% [${'%'.repeat(number / 10)}${'.'.repeat(10 - number / 10)}]`;

    console.log(loadingBar);

    const isLoading = number < 100;

    isLoading ? console.log('Still loading...') : console.log('100% Complete!');
}

solve(100);
