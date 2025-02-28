class Vehicle {
    #parts = {};

    constructor(type, model, parts, fuel) {
        this.type = type;
        this.model = model;
        this.fuel = fuel;
        this.parts = parts;
    }

    drive(fuelLoss) {
        this.fuel = this.fuel - fuelLoss;
    }

    set parts(value) {
        this.#parts = {
            engine: value.engine,
            power: value.power,
            quality: value.engine * value.power
        };
    }

    get parts() {
        return this.#parts;
    }
}


// let parts = { engine: 6, power: 100 };

// let vehicle = new Vehicle('a', 'b', parts, 200);

// vehicle.drive(100);

// console.log(vehicle.fuel);

// console.log(vehicle.parts.quality);

let parts = {engine: 9, power: 500}; 
let vehicle = new Vehicle('l', 'k', parts, 840); 
vehicle.drive(20); 
console.log(vehicle.fuel);