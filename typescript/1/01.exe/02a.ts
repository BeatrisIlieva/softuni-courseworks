enum daysOfTheWeek {
    Monday = 1,
    TuesDay,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

function getWeekDay(num: number): string {
    return daysOfTheWeek[num] || 'error';
}

console.log(getWeekDay(1));
console.log(getWeekDay(-1));
console.log(getWeekDay(5));
