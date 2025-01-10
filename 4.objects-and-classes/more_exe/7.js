function solve(input) {
    const result = [];

    input.forEach((array) => {
        const sortedArray = JSON.parse(array).sort((a, b) => b - a);

        if (!result.some((el) => JSON.stringify(el) === JSON.stringify(sortedArray))) {
            result.push(sortedArray);
        }
    });

    result.sort((a, b) => a.length - b.length);

    result.forEach((el) => {
        console.log(`[${el.join(', ')}]`);
    });
}

solve(['[-3, -2, -1, 0, 1, 2, 3, 4]', '[10, 1, -17, 0, 2, 13]', '[4, -3, 3, -2, 2, -1, 1, 0]']);
