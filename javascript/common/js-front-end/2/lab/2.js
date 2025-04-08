function solve(n, array) {
    const result = array.slice(0, n).reverse();
    console.log(result.join(' '));
}

solve(4, [-1, 20, 99, 5]);
