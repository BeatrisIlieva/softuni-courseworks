function solve(commands) {
    const objects = {};

    const operations = {
        create(name, parentName) {
            objects[name] = parentName ? Object.create(objects[parentName]) : {};
        },
        set(name, key, value) {
            objects[name][key] = value;
        },
        print(name) {
            const props = [];
            for (let obj = objects[name]; obj; obj = Object.getPrototypeOf(obj)) {
                props.push(...Object.entries(obj));
            }
            console.log(props.map(([k, v]) => `${k}:${v}`).join(','));
        }
    };

    commands.forEach(cmd => {
        const parts = cmd.split(' ');
        if (parts[0] === 'create') {
            parts.length === 2 ? operations.create(parts[1]) : operations.create(parts[1], parts[3]);
        } else if (parts[0] === 'set') {
            operations.set(parts[1], parts[2], parts[3]);
        } else if (parts[0] === 'print') {
            operations.print(parts[1]);
        }
    });
}



// solve([
//     'create c1',

//     'create c2 inherit c1',

//     'set c1 color red',

//     'set c2 model new',

//     'print c1',

//     'print c2'
// ]);

solve([
    'create pesho',
    'create gosho inherit pesho',
    'create stamat inherit gosho',
    'set pesho rank number1',
    'set gosho nick goshko',
    'print stamat'
]);
