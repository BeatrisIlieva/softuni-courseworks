function solve(length, maxCount) {
    const result = [1];

    for (let i = 0; i < length - 1; i++) {
        const lastIndex = result.length - 1;
        let count = 0;

        let sum = 0;

        for (let i = lastIndex; i >= 0; i--) {
            sum += result[i];
            count += 1;

            if (count === maxCount) {
                break;
            }
        }

        result.push(sum)
    }

    return result;
}

console.log(solve(8, 2));
