function solve(num) {
    const matrix = [];

    for (let i = 0; i < num; i++) {
        matrix.push([]);
        for (let j = 0; j < num; j++) {
            matrix[i].push(num);
        }
    }

    matrix.forEach(row => console.log(row.join(' ')));
}

solve(3);
