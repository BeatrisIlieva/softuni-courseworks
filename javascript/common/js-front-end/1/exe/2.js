function solve(peopleCount, groupType, weekDay) {
    const priceTable = {
        Students: { Friday: 8.45, Saturday: 9.8, Sunday: 10.46 },
        Business: { Friday: 10.9, Saturday: 15.6, Sunday: 16 },
        Regular: { Friday: 15, Saturday: 20, Sunday: 22.5 }
    };

    const priceCalculator = {
        Students(peopleCount, pricePerPerson) {
            const totalPrice = peopleCount * pricePerPerson;

            return peopleCount >= 30 ? totalPrice * 0.85 : totalPrice;
        },
        Business(peopleCount, pricePerPerson) {
            peopleCount = peopleCount >= 100 ? peopleCount - 10 : peopleCount;

            return peopleCount * pricePerPerson;
        },
        Regular(peopleCount, pricePerPerson) {
            const totalPrice = peopleCount * pricePerPerson;

            return peopleCount >= 10 && peopleCount <= 20 ? totalPrice * 0.95 : totalPrice;
        }
    };

    const pricePerPerson = priceTable[groupType][weekDay];

    const totalPrice = priceCalculator[groupType](peopleCount, pricePerPerson);

    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}

const peopleCount = 40;

solve(
    peopleCount,

    'Regular',

    'Saturday'
);
