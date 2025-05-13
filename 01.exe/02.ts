enum daysOfTheWeek {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

function printDay(integer: number): string {
    if (integer in daysOfTheWeek) {
        return daysOfTheWeek[integer];
    }

    return 'error';
}

const number = -2;
console.log(printDay(number));
