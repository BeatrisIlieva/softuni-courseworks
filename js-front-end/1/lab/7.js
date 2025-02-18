function solve(day, age) {
    const pricesByDay = {
        weekday: { child: 12, adult: 18, senior: 12 },
        weekend: { child: 15, adult: 20, senior: 15 },
        holiday: { child: 5, adult: 12, senior: 10 },
    };

    const ageCategories = [
        { min: 0, max: 18, category: 'child' },
        { min: 19, max: 64, category: 'adult' },
        { min: 65, max: 122, category: 'senior' },
    ];

    const category =
        ageCategories.find(({ min, max }) => min <= age && age <= max)?.category || null;

    const dayToLowerCase = day.toLowerCase();

    const price = category ? pricesByDay[dayToLowerCase][category] : null;

    if (price) {
        console.log(`${price}$`);
    } else {
        console.log('Error!');
    }
}

solve('Weekday', 11);
