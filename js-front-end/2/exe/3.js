function solve(array) {
    const names = array.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    names.forEach((name, index) => console.log(`${index + 1}.${name}`));
}

solve(['John', 'Bob', 'john', 'Christina', 'Ema']);
