function printDay(dayNum: number): string {
    enum daysOfTheWeek {
        Monday = 1,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }

    return daysOfTheWeek[dayNum] || 'error';
}

const number = 1;
console.log(printDay(number));
