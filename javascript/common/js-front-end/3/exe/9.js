function solve(num) {
    const bar = [];
    const units = num / 10;

    for (let i = 0; i < units; i++) {
        bar.push('%');
    }

    for (let i = 0; i < 10 - units; i++) {
        bar.push('.');
    }

    if (num < 100) {
        console.log(`${num}% [${bar.join('')}]`);
        console.log('Still loading...');
    } else {
        console.log('100% Complete!');
        console.log(`[${bar.join('')}]`);
    }
}

solve(10);
