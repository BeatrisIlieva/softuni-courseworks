const someArr = [1, 2, 3, 4, 5];

const iterator = someArr[Symbol.iterator]();
let result = iterator.next();

while (!result.done) {
    console.log(result.value);

    result = iterator.next();
}
