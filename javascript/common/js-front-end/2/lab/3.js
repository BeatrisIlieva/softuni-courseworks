function solve(array) {
    let evenSum = 0;
    let oddSum = 0;

    array.forEach(num => (num % 2 == 0 ? (evenSum += num) : (oddSum += num)));

    console.log(evenSum - oddSum);
}

solve([3, 5, 7, 9]);
