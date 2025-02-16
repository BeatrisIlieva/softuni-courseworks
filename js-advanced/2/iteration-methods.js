
let cars = ['Mercedes', 'BMW', 'Audi', 'Toyota'];

// The goal of forEach method is to iterate through the 
// array and to execute an action on each element
// it accepts a callback function that executes an action on every element
cars.forEach((car, index) => {
    console.log(index);
    console.log(car.toUpperCase())
});


// 
