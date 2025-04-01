function solve(input) {
    const data = [...input];
    let message = data.shift();

    let command = data.shift();

    while (command != 'Buy') {
        const commands = command.split('?');
        const action = commands.shift();

        switch (action) {
            case 'TakeEven':
                message = message
                    .split('')
                    .filter((_, index) => index % 2 == 0)
                    .join('');

                console.log(message);

                break;
            case 'ChangeAll':
                const substring = commands.shift();
                const replacement = commands.shift();

                message = message.split(substring).join(replacement);

                console.log(message);

                break;

            case 'Reverse':
                let match = commands.shift();

                if (!message.includes(match)) {
                    console.log('error');
                } else {
                    message = message.replace(match, '');

                    match = match.split('').reverse().join('');
                    message = message.concat(match);

                    console.log(message);
                }
        }

        command = data.shift();
    }

    console.log(`The cryptocurrency is: ${message}`);
}

solve([
    'PZDfA2PkAsakhnefZ7aZ',
    'TakeEven',
    'TakeEven',
    'TakeEven',
    'ChangeAll?Z?X',
    'ChangeAll?A?R',
    'Reverse?PRX',
    'Buy'
]);
