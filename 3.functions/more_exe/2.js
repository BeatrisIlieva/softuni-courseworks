function solve(number) {
    let numberAsString = number.toString().split('');

    let sum = calculateSum(numberAsString);

    while (sum / numberAsString.length <= 5) {
        numberAsString.push(9);

        sum = calculateSum(numberAsString);
    }

    function calculateSum(array) {
        return array.reduce((acc, curr) => acc + Number(curr), 0);
    }
    console.log(numberAsString.join(''));
}

solve(101);
