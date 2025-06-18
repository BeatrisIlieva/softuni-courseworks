enum Weekdays {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

function printDay(num: number): string {
    const day = Weekdays[num];

    return day || 'error';
}

console.log(printDay(1));
console.log(printDay(8));
