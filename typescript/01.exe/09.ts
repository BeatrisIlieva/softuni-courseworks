function friday13(arr: unknown[]): void {
    enum Months {
        January,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
    }

    for (const el of arr) {
        if (el instanceof Date) {
            const dayNum = el.getDate();
            const weekDay = el.getDay();

            const monthName = Months[el.getMonth()];
            const year = el.getFullYear();

            if (dayNum === 13 && weekDay === 5) {
                console.log(`${dayNum}-${monthName}-${year}`);
            }
        }
    }
}

friday13([
    new Date(2024, 0, 13),

    new Date(2024, 1, 13),

    new Date(2024, 2, 13),

    new Date(2024, 3, 13),

    new Date(2024, 4, 13),

    new Date(2024, 5, 13),

    new Date(2024, 6, 13),

    new Date(2024, 7, 13),

    new Date(2024, 8, 13),

    new Date(2024, 9, 13),

    new Date(2024, 10, 13),

    new Date(2024, 11, 13)
]);
