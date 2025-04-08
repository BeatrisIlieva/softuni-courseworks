function solve(a, b) {
    function calculateFactorial(num) {
        if (num === 1) {
            return 1;
        }

        return num * calculateFactorial(num - 1);
    }

    const firstSum = calculateFactorial(a);
    const secondSum = calculateFactorial(b);

    const result = firstSum / secondSum;

    console.log(result.toFixed(2));
}

solve(6, 2);
