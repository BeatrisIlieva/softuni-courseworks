const array = ['20', '30', '40', '50', '60'];

let result = [];

array.forEach((el, i) => {
    if (i % 2 === 0) {
        result.push(el);
    }
});

console.log(result.join(' '));