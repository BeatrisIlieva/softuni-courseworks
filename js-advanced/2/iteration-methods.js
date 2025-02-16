// The goal of this method is to iterate through the 
// array and to execute an action on each element
// it accepts a callback function that executes an action on every element

let cars = ['Mercedes', 'BMW', 'Audi', 'Toyota'];

cars.forEach((car, index) => {
    console.log(index);
    console.log(car.toUpperCase())
});