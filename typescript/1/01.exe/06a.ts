enum daysOfTheWeek2 {
    Monday = 1,
    TuesDay,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

function printReversedDayOfWeek(day: string): number | string {
    const dayOfWeek = daysOfTheWeek2[day as keyof typeof daysOfTheWeek2];

    return dayOfWeek || 'error';
}

console.log(printReversedDayOfWeek('Monday'));
console.log(printReversedDayOfWeek('Invalid'));
