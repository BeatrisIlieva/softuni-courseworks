let cat = {
    sleep: function () {
        console.log('Zzzz');
    },
};

cat.sleep();

// add method using method notation
let car = {
    drive() {
        console.log('Brrrum');
    },
};

car.drive();

let bird = {
    fly: () => console.log('fly'),
};

bird.fly();

