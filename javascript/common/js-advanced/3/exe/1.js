function solve(input) {
    const result = input.reduce((acc, curr, index) => {
        if (index % 2 === 0) {
            acc[curr] = Number(input[index + 1]);
        }

        return acc;
    }, {});

    console.log(result);
}

solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);
