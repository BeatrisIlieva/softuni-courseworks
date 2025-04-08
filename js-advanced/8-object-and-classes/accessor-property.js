class Circle {
    #private;

    constructor(radius) {
        this.radius = radius;
    }

    // getter property
    get diameter() {
        return this.radius * 2;
    }

    //setter property
    set diameter(value) {
        this.radius = value / 2;
    }

    get private(){
        return this.#private
    }

    set private(value){
        this.#private = value;
    }
}

const circle = new Circle(5);
console.log(circle.diameter);
circle.radius = 10;
console.log(circle.diameter);

circle.diameter = 100;
console.log(circle.radius);
console.log(circle.diameter);
