function solve(number) {
    const string = 'ATCGTTAGGG';
    let index = 0;
    let step = 2;

    for (let i = 0; i < number; i++) {
        let firstLetter = string[index];
        let secondLetter = string[index + 1];

        if (i === 0 || i % 4 == 0) {
            console.log(`**${firstLetter}${secondLetter}**`);
        } else if (i % 2 !== 0) {
            console.log(`*${firstLetter}--${secondLetter}*`);
        } else if (i % 2 === 0) {
            console.log(`${firstLetter}----${secondLetter}`);
        }

        if (index === string.length - 2) {
            index = 0;
        } else {
            index += step;
        }
    }
}

solve(10);

// **AT**  0
// *C--G*  1
// T----T  2
// *A--G*  3
// **GG**  4
// *A--T*  5
// C----G  6
// *T--T*  7
// **AG**  8
// *G--G*  9
