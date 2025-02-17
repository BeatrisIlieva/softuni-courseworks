let count = 5;

const commands = {
    increment() {
        count++;
    },
    decrement() {
        count--;
    },
    reset() {
        count = 0;
    },
};

// commands.increment();
const command = 'increment';
commands[command]();
console.log(count);