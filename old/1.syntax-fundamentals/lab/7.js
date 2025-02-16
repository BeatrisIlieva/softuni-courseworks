function solve(dayType, age) {
    let price;

    if (age >= 0 && age <= 18) {
        if (dayType === 'Weekday') {
            price = 12;
        } else if (dayType === 'Weekend') {
            price = 15;
        } else if (dayType === 'Holiday') {
            price = 5;
        } else {
            console.log('Error!');
            return;
        }
        console.log(`${price}$`);
    } else if (age > 18 && age <= 64) {
        if (dayType === 'Weekday') {
            price = 18;
        } else if (dayType === 'Weekend') {
            price = 20;
        } else if (dayType === 'Holiday') {
            price = 12;
        } else {
            console.log('Error!');
            return;
        }
        console.log(`${price}$`);
    } else if (age > 64 && age <= 122) {
        if (dayType === 'Weekday') {
            price = 12;
        } else if (dayType === 'Weekend') {
            price = 15;
        } else if (dayType === 'Holiday') {
            price = 10;
        } else {
            console.log('Error!');
            return;
        }
        console.log(`${price}$`);
    } else {
        console.log('Error!');
    }
}

solve('Weekday', 42); // Output: 18$


solve('Weekday', 42);
