const arr = [1, 2, 3];

const result = arr.some(el => {
    if (el == 2) {
        return true;
    }

    console.log('iter');
});
console.log(result);
