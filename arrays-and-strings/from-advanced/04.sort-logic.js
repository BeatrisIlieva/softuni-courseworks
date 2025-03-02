const numbers = [10, 2, 8, 1, 23, 9, 7];

numbers.sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (b > a) {
        return -1;
    } else {
        return 0;
    }
});

console.log(numbers);
