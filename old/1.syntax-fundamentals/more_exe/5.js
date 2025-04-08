function solve(spiceAmount) {
    extractedAmount = 0;
    daysCount = 0;

    while (spiceAmount >= 100) {
        extractedAmount += spiceAmount;

        daysCount += 1;

        extractedAmount -= 26;

        spiceAmount -= 10;
    }

    extractedAmount = Math.max(0, extractedAmount - 26);

    console.log(daysCount);
    console.log(extractedAmount);
}

solve(450);
