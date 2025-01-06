function solve(base, increment) {
    const materialsUsed = {
        stone: 0,
        marble: 0,
        'lapis-lazuli': 0,
        gold: 0,
    };

    let counter = 1;

    while (base - 2 > 0) {
        const totalArea = base * base;

        const stoneArea = (base - 2) * (base - 2) * increment;
        materialsUsed.stone += stoneArea;

        if (counter % 5 === 0) {
            const lapisArea = (totalArea - stoneArea) * increment;
            materialsUsed['lapis-lazuli'] += lapisArea;
        } else {
            const marbleArea = (totalArea - stoneArea) * increment;
            materialsUsed.marble += marbleArea;
        }

        base -= 2;

        counter += 1;
    }

    materialsUsed.gold += base * base * increment;

    console.log(`Stone required: ${Math.ceil(materialsUsed.stone)}`);
    console.log(`Marble required: ${Math.ceil(materialsUsed.marble)}`);
    console.log(
        `Lapis Lazuli required: ${Math.ceil(materialsUsed['lapis-lazuli'])}`
    );
    console.log(`Gold required: ${Math.ceil(materialsUsed.gold)}`);
    console.log(`Final pyramid height: ${Math.floor(counter * increment)}`);
}

solve(
    11,

    0.75
);
