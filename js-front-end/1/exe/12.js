function solve(number, ...commands) {
    number = Number(number);
    
    const commandOptions = {
        chop: num => num / 2,
        dice: num => Math.sqrt(num),
        spice: num => num + 1,
        bake: num => num * 3,
        fillet: num => (num * 0.8).toFixed(1)
    };

    commands.forEach(command => {
        number = commandOptions[command](number);
        console.log(number);
    });
}

solve(
    '9',
    'dice',
    'spice',
    'chop',
    'bake',

    'fillet'
);
