function solve(input) {
    const result = input.reduce((acc, curr) => {
        let [hero, level, items] = curr.split(' / ');

        items = items.split(', ');

        acc.push({ Hero: hero, level, items });
        return acc;
    }, []);

    result
        .sort((a, b) => a.level - b.level)
        .forEach(element => {
            for (let key in element) {
                const separator = key == 'Hero' ? ': ' : ' => ';
                const value = key != 'items' ? element[key] : element[key].join(', ');

                value && console.log(`${key}${separator}${value}`);
            }
        });
}

solve([
    'Isacc / 25 / Apple, GravityGun',

    'Derek / 12 / BarrelVest, DestructionSword',

    'Hes / 1 / '
]);
