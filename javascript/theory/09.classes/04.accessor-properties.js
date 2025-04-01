class Circle {
    #private = 'private';

    constructor(radius) {
        this.radius = radius;
    }

    // accessor property is defined as a method but it is a property
    // getter
    get diameter() {
        return this.radius * 2;
    }

    // setter
    set diameter(value) {
        this.radius = value / 2;
    }

    get private() {
        return this.#private;
    }

    set private(value) {
        this.#private = value;
    }
}

const circle = new Circle(5);
console.log(circle.diameter); // 10

circle.radius = 10;
console.log(circle.diameter); // 20

circle.diameter = 100;
console.log(circle.diameter); // 100
console.log(circle.radius); // 50

console.log(circle.private); // private
circle.private = 'something else';
console.log(circle.private); // something else
