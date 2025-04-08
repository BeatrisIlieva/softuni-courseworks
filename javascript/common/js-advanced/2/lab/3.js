function solve(array) {
    const firstNum = array.shift();
    const lastNum = array.pop();

    const sum = Number(firstNum) + Number(lastNum);

    return sum;
}

console.log(solve(['20', '30', '40']));
