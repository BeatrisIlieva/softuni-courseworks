function solve(input) {
    const data = [...input];

    let spell = data.shift();

    const actions = {
        RemoveEven() {
            let updatedSpell = '';

            for (let i = 0; i < spell.length; i++) {

                if(i % 2 == 0) { updatedSpell += spell[i] }
            }

            spell = updatedSpell;

            console.log(updatedSpell);
        },

        TakePart(indices) {
            [startIndex, endIndex] = indices.map(index => Number(index));

            spell = spell.substring(startIndex, endIndex);

            console.log(spell);
        },

        Reverse(substring) {
            const matchedSubstring = spell.match(substring);

            if(!matchedSubstring) {
                console.log('Error')
            } else {
                const reversedMatchedSubstring = matchedSubstring[0].split('').reverse().join('');

                spell = spell.replace(substring, reversedMatchedSubstring);

                console.log(spell);
            }
        },
    }

    while (true) {
        const command = data.shift();

        const [action, ...rest] = command.split('!');

        if (action == 'End') {
            console.log(`The concealed spell is: ${spell}`);

            break;
        }

        rest ? actions[action](rest) : actions[action]();
    }
}

solve([
    'asAsl2adkda2mdaczsa',
    'RemoveEven',
    'TakePart!1!9',
    'Reverse!maz',
    'End'
]);
