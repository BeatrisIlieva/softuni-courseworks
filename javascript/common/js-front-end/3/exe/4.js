function solve(input) {
    const inputAsArray = input.toString().split('');

    const resultObj = { 'Odd sum': 0, 'Even sum': 0 };

    inputAsArray.map(num => {
        const currentNum = Number(num);
        const isOdd = currentNum % 2 !== 0;

        isOdd ? (resultObj['Odd sum'] += currentNum) : (resultObj['Even sum'] += currentNum);
    });

    const result = Object.entries(resultObj)
        .map(([key, value]) => {
            return `${key} = ${value}`;
        })
        .join(', ');

    console.log(result);
}

solve(177766644443322);
