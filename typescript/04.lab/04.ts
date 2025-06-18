type Contiditional<T> = T extends number ? number : string;

function conditionalNumber<T>(input: Contiditional<T>) {
    if (typeof input === 'number') {
        console.log(input.toFixed(2));
    } else {
        console.log(input);
    }
}

conditionalNumber<number>(20.3555);
conditionalNumber<string>('wow');
conditionalNumber<boolean>('a string');

// conditionalNumber<boolean>(30);
// conditionalNumber<number>('test');
