function solve(peopleCount, groupType, day) {
    let pricePerPerson;

    switch (day) {
        case 'Friday':
            switch (groupType) {
                case 'Students':
                    pricePerPerson = 8.45;
                    break;
                case 'Business':
                    pricePerPerson = 10.9;
                    break;
                case 'Regular':
                    pricePerPerson = 15;
                    break;
            }
            break;
        case 'Saturday':
            switch (groupType) {
                case 'Students':
                    pricePerPerson = 9.8;
                    break;
                case 'Business':
                    pricePerPerson = 15.6;
                    break;
                case 'Regular':
                    pricePerPerson = 20;
                    break;
            }
            break;
        case 'Sunday':
            switch (groupType) {
                case 'Students':
                    pricePerPerson = 10.46;
                    break;
                case 'Business':
                    pricePerPerson = 16;
                    break;
                case 'Regular':
                    pricePerPerson = 22.5;
                    break;
            }
            break;
    }

    let totalPrice = peopleCount * pricePerPerson;

    if (groupType === 'Students' && peopleCount >= 30) {
        totalPrice *= 0.85;
        return console.log(`Total price: ${totalPrice.toFixed(2)}`);
    }

    if (groupType === 'Business' && peopleCount >= 100) {
        totalPrice -= pricePerPerson * 10;
        return console.log(`Total price: ${totalPrice.toFixed(2)}`);
    }

    if (groupType === 'Regular' && peopleCount >= 10 && peopleCount <= 20) {
        totalPrice *= 0.95;
        return console.log(`Total price: ${totalPrice.toFixed(2)}`);
    }

    console.log(`Total price: ${totalPrice.toFixed(2)}`)
}

solve(
    40,

    'Regular',

    'Saturday'
);
