function solve(input) {
    const products = input.shift().split('!');

    let command = input.shift();

    while (command !== 'Go Shopping!') {
        const [action, item, ...args] = command.split(' ');

        switch (action) {
            case 'Urgent':
                if (!products.find(element => element === item)) {
                    products.splice(0, 0, item);
                }
                break;

            case 'Unnecessary':
                const itemIndex = products.indexOf(item);

                if (itemIndex >= 0) {
                    products.splice(itemIndex, 1);
                }
                break;

            case 'Correct':
                const itemIndexToRemove = products.indexOf(item);

                if (itemIndexToRemove >= 0) {
                    products.splice(itemIndexToRemove, 1, args.pop());
                }

                break;

            case 'Rearrange':
                const itemIndexToMove = products.indexOf(item);

                if (itemIndexToMove >= 0) {
                    const result = products.splice(itemIndexToMove, 1).pop();

                    products.push(result);
                }

                break;
        }

        command = input.shift();
    }

    console.log(products.join(', '));
}

solve([
    'Milk!Pepper!Salt!Water!Banana',
    'Urgent Salt',
    'Unnecessary Grapes',
    'Correct Pepper Onion',
    'Rearrange Grapes',
    'Correct Tomatoes Potatoes',
    'Go Shopping!'
]);
