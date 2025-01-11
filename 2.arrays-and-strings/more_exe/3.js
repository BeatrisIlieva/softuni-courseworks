function pyramidConstruction(base, increment) {
    let totalStone = 0;
    let totalMarble = 0;
    let totalLapis = 0;
    let gold = 0;
    let height = 0;

    let currentBase = base;
    while (currentBase > 0) {
        height++;

        if (currentBase === 1 || currentBase === 2) {
            gold += currentBase * currentBase * increment;
            break;
        }

        let totalBlocks = currentBase * currentBase;
        let innerBlocks = (currentBase - 2) * (currentBase - 2);
        let outerBlocks = totalBlocks - innerBlocks;

        totalStone += innerBlocks * increment;

        if (height % 5 === 0) {
            totalLapis += outerBlocks * increment;
        } else {
            totalMarble += outerBlocks * increment;
        }

        currentBase -= 2;
    }

    const totalHeight = Math.floor(height * increment);

    console.log(`Stone required: ${Math.ceil(totalStone)}`);
    console.log(`Marble required: ${Math.ceil(totalMarble)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(totalLapis)}`);
    console.log(`Gold required: ${Math.ceil(gold)}`);
    console.log(`Final pyramid height: ${totalHeight}`);
}
