function solve(input) {
    const count = Number(input.shift());

    const pieces = {};

    for (let i = 0; i < count; i++) {
        const [piece, composer, key] = input.shift().split('|');

        pieces[piece] = { composer, key };
    }

    let command = input.shift();

    while (command != 'Stop') {
        const [action, piece, ...args] = command.split('|');

        switch (action) {
            case 'Add':
                if (pieces.hasOwnProperty(piece)) {
                    console.log(`${piece} is already in the collection!`);
                } else {
                    const [composer, key] = args;

                    pieces[piece] = { composer, key };
                    console.log(`${piece} by ${composer} in ${key} added to the collection!`);
                }
                break;

            case 'Remove':
                if (!pieces.hasOwnProperty(piece)) {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                } else {
                    delete pieces[piece];

                    console.log(`Successfully removed ${piece}!`);
                }
                break;

            case 'ChangeKey':
                const newKey = args.pop();

                if (!pieces.hasOwnProperty(piece)) {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                } else {
                    pieces[piece].key = newKey;

                    console.log(`Changed the key of ${piece} to ${newKey}!`);
                }

                break;
        }

        command = input.shift();
    }

    for (const piece in pieces) {
        console.log(`${piece} -> Composer: ${pieces[piece].composer}, Key: ${pieces[piece].key}`);
    }
}

solve([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'
]);
