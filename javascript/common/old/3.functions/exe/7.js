function solve(num) {
    for (let i = 0; i < num; i++) {
        console.log(new Array(num).fill(num).join(' '));
    }
}

solve(7);
