enum Months {
    January = 1,
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

function fridayThirteenth(dateInput: unknown[]): void {
    for (let el of dateInput) {
        if (el instanceof Date) {
            const isFriday = el.getDay() === 5;
            const date = el.getDate();

            if (isFriday && date === 13) {
                const monthNumber = el.getMonth() + 1;
                const monthName = Months[monthNumber];
                console.log(`${date}-${monthName}-${el.getFullYear()}`);
            }
        }
    }
}

fridayThirteenth([
    {},
    new Date(2025, 4, 13),
    null,
    new Date(2025, 5, 13),
    '13-09-2023',
    new Date(2025, 6, 13)
]);

fridayThirteenth([
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
