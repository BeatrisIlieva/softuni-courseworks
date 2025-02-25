function area() {
    return Math.abs(this.x * this.y);
}

function vol() {
    return Math.abs(this.x * this.y * this.z);
}

function solve(area, vol, input) {
    input = JSON.parse(input);

    const result = input.reduce(
        (acc, curr) => [...acc, { area: area.call(curr), volume: vol.call(curr) }],
        []
    );

    return result;
}

const result = solve(
    area,
    vol,
    `[ {"x":"1","y":"2","z":"10"}, {"x":"7","y":"7","z":"10"}, {"x":"5","y":"2","z":"10"} ]`
);

console.log(result);
