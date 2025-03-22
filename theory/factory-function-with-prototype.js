const cat = {
    meow() {
        console.log('meow');
    }
};

function catFactory(name) {
    const newCat = { name };

    Object.setPrototypeOf(newCat, cat);

    return newCat;
}

const firstCat = catFactory('Daisy');
const secondCat = catFactory('Tom');

console.log(firstCat);
console.log(firstCat.meow === secondCat.meow); // true
