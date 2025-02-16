function solve(data) {
    const result = {};

    for (let line of data) {
        const [weekday, name] = line.split(' ');

        if (weekday in result) {
            console.log(`Conflict on ${weekday}!`);
        } else {
            result[weekday] = name;
            console.log(`Scheduled for ${weekday}`);
        }
    }

    Object.entries(result).forEach(([key, value]) => console.log(`${key} -> ${value}`));
}

solve(['Friday Bob', 'Saturday Ted', 'Monday Bill', 'Monday John', 'Wednesday George']);
