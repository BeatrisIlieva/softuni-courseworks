function getFibonator() {
    const fibRow = [0, 1];

    return function () {
        if (fibRow.length == 2) {
            fibRow.push(1);
            return 1;
        }
        const firstNum = fibRow[fibRow.length - 2];
        const secondNum = fibRow[fibRow.length - 3];

        const currentNum = firstNum + secondNum;
        fibRow.push(currentNum)

        console.log(fibRow);

        return currentNum;
    };
}

let fib = getFibonator();

console.log(fib()); // 1

console.log(fib()); // 1

console.log(fib()); // 2

console.log(fib()); // 3

console.log(fib()); // 5

console.log(fib()); // 8

console.log(fib()); // 13
