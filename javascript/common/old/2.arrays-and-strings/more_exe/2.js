function solve(goldAmountsPerDay) {
    const pricePerBitcoin = 11949.16;
    const goldPricePerGram = 67.51;

    let result = {
        bitcoinsCount: 0,
        dayFirstBought: null,
        availableMoney: 0,
    };

    goldAmountsPerDay.forEach((dailyGold, index) => {
        currentDay = index + 1;

        if (currentDay % 3 === 0) {
            dailyGold *= 0.7;
        }

        result.availableMoney += dailyGold * goldPricePerGram;

        while (result.availableMoney >= pricePerBitcoin) {
            result.bitcoinsCount += 1;
            result.availableMoney -= pricePerBitcoin;

            if (result.bitcoinsCount === 1) {
                result.dayFirstBought = currentDay;
            }
        }
    });

    console.log(`Bought bitcoins: ${result.bitcoinsCount}`);
    if (result.dayFirstBought !== null) {
        console.log(
            `Day of the first purchased bitcoin: ${result.dayFirstBought}`
        );
    }
    console.log(`Left money: ${result.availableMoney.toFixed(2)} lv.`);
}

solve([3124.15, 504.212, 2511.124]);
