function solve(input) {
    const [target, ...chunks] = input;

    function transportAndWash(chunk) {
        console.log('Transporting and washing');

        return Math.floor(chunk);
    }

    const operations = [
        { name: 'Cut', fn: (x) => x / 4, limit: (x) => x / 4 >= target },
        { name: 'Lap', fn: (x) => x * 0.8, limit: (x) => x * 0.8 >= target },
        { name: 'Grind', fn: (x) => x - 20, limit: (x) => x - 20 >= target },
        { name: 'Etch', fn: (x) => x - 2, limit: (x) => x - 2 >= target - 1 },
    ];

    for (let chunk of chunks) {
        let xRayUsed = false;

        console.log(`Processing chunk ${chunk} microns`);

        for (const { name, fn, limit } of operations) {
            let count = 0;

            while (limit(chunk)) {
                chunk = fn(chunk);
                count++;
            }

            if (count > 0) {
                console.log(`${name} x${count}`);
                chunk = transportAndWash(chunk);
            }

            if (chunk + 1 === target && !xRayUsed) {
                chunk += 1;
                console.log('X-ray x1');
                xRayUsed = true;
            }

            if (chunk === target) {
                console.log(`Finished crystal ${target} microns`);
                break;
            }
        }
    }
}

solve([1375, 50000]);
