function solve(x, y) {
    function factorial(num) {
        if (num == 1) {
            return num;
        }

        return num * factorial(num - 1);
    }

    const xFactorial = factorial(x);
    const yFactorial = factorial(y);

    const result = (xFactorial / yFactorial).toFixed(2);

    console.log(result);
}

solve(6, 2);
