function outer() {
    let name = 'Pesho';

    return function () {
        console.log(name);
    };
}

const inner = outer();

inner();
