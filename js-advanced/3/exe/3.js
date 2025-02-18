function solve({ model, power, color, carriage, wheelsize }) {
    function carFactory(model, power, volume, type, color, wheels) {
        return {
            model,
            engine: { power, volume },
            carriage: { type, color },
            wheels,
        };
    }

    let volume;
    if (power <= 90) {
        power = 90;
        volume = 1800;
    } else if (power <= 120) {
        power = 120;
        volume = 2400;
    } else {
        power = 200;
        volume = 3500;
    }

    if (wheelsize % 2 === 0) {
        wheelsize -= 1;
    }

    const wheels = new Array(4);
    wheels.fill(wheelsize);

    return carFactory(model, power, volume, carriage, color, wheels);
}

console.log(
    solve({
        model: 'Ferrari',
        power: 200,
        color: 'red',
        carriage: 'coupe',
        wheelsize: 21
    })
);
