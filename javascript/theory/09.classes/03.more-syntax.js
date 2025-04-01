class Car {
    // here we do not use let or const
    // it is not set through the constructor
    speed = 0;

    // static property
    static tierCount = 4; // default property that every instance will have

    // private property -> we cannot access it outside the class
    // we can define private properties only at this level
    #isMoving = false;

    // static private property
    static #secret = 'secret';

    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    // instance method
    accelerate(speed) {
        this.speed += speed;
        this.#isMoving = true;

        if (this.speed > 200) {
            this.#factoryReset();
        } 
    }

    // private method -> we cannot access it outside the class
    #factoryReset() {
        this.speed = 0;
        this.#isMoving = false;
    }

    // static method
    static staticMethod() {
        // this here refers to the class
        console.log(this.tierCount);
        // we can access private methods from here
        console.log(this.#secret); // secret
        this.#privateMethod(); // from static private method
    }

    // static private method
    static #privateMethod() {
        // has access to static properties and methods
        // only static methods can access a static private method
        console.log('from static private method');
    }
}

const tesla = new Car('Tesla', 'Y');

// console.log(tesla.#isMoving);
// SyntaxError: Private field '#isMoving' must be declared in an enclosing class

tesla.accelerate(100);
console.log(tesla); // Car {#isMoving: true, speed: 100, brand: 'Tesla', model: 'Y'}
tesla.accelerate(101);
console.log(tesla); // Car {#isMoving: false, speed: 0, brand: 'Tesla', model: 'Y'}

// try to access static property through the instance
console.log(tesla.tierCount); // undefined

// access static property through the class
console.log(Car.tierCount); // 4

try {
    tesla.staticMethod(); // tesla.staticMethod is not a function
} catch (err) {
    console.log(err.message);
}

Car.staticMethod(); // 4
