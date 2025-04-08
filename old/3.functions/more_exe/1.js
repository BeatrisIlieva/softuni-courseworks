function solve(commands) {
    const carWash = {
        soap: (num) => num + 10,
        water: (num) => num * 1.2,
        'vacuum cleaner': (num) => num * 1.25,
        mud: (num) => num * 0.9,
    };

    let cleanness = 0;

    for (let command of commands) {
        cleanness = carWash[command](cleanness);
    }

    console.log(`The car is ${cleanness.toFixed(2)}% clean.`);
}

solve(['soap', 'water', 'mud', 'mud', 'water', 'mud', 'vacuum cleaner']);
