function reverseDays(day: string): number | string {
    enum Weekdays {
        Monday = 1,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }

    return Weekdays[day as keyof typeof Weekdays] || 'error';
}

console.log(reverseDays('Monday'));
console.log(reverseDays('Invalid'));

