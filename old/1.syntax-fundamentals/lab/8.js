function solve(param) {
    if (typeof param === 'number') {
        console.log((Math.PI * param ** 2).toFixed(2));
        return;
    }

    console.log(
        `We can not calculate the circle area, because we receive a ${typeof param}.`
    );
}

solve(5);
solve('name');
