function solve(input) {
    const obj = {};

    input.forEach(line => {
        const [day, name] = line.split(' ');

        if (obj[day]) {
            console.log(`Conflict on ${day}!`);
        } else {
            obj[day] = name;
            console.log(`Scheduled for ${day}`);
        }
    });

    for (let key in obj) {
        console.log(`${key} -> ${obj[key]}`);
    }
}

solve(['Friday Bob', 'Saturday Ted', 'Monday Bill', 'Monday John', 'Wednesday George']);
