enum days {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

function printReverseDayOfWeek(day: string): string | number {
    const dayExists = days[day as keyof typeof days];

    if (dayExists) {
        return dayExists;
    }

    return 'error';
}

console.log(printReverseDayOfWeek('Monday'));
console.log(printReverseDayOfWeek('Invalid'));
