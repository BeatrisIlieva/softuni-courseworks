function solve(array) {
    let result = [];

    const commands = {
        add(word) {
            result.push(word);
        },
        remove(word) {
            result = result.filter(element => element != word);
        },
        print() {
            console.log(result.join(','));
        }
    };

    array.forEach(string => {
        const [command, word] = string.split(' ');

        if (command != 'print') {
            commands[command](word);
        } else {
            commands[command]();
        }
    });
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
