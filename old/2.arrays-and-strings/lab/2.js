function solve(count, numbers) {
    const newArray = numbers.slice(0, count);

    const reversedString = newArray.reverse().join(' ');

    console.log(reversedString);
}

solve(3, [10, 20, 30, 40, 50]);
