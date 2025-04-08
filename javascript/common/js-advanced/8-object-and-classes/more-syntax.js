class Car {
    // set default initialized property
    speed = 0;
    // set static property
    static tierCount = 4;
    // private property
    #isMoving = false;
    // static private property
    static #secret = 'secret';

    constructor(manufacturer, model) {
        this.manufacturer = manufacturer;
        this.model = model;
    }

    accelerate(speed) {
        this.speed += speed;
        this.#isMoving = true;

        if (this.speed > 200) {
            this.#reset();
        }
    }

    //private method
    #reset() {
        this.speed = 0;
        this.#isMoving = false;
        this.tierCount = 4;
    }

    static staticMethod(){
        console.log(this.tierCount);
        console.log(this.#secret);
    }

    // Static private method
    static #privateMethod(){

    }
}

const tesla = new Car('Tesla', 'Y');
console.log(tesla);
tesla.accelerate(100);
console.log(tesla);
tesla.accelerate(200);
console.log(tesla);
