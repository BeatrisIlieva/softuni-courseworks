const cars = ['BMW', 'Mercedes', 'Audi', 'Toyota'];

// pop()
// returns the element
const lastLastElement = cars.pop();
console.log(cars); // ['BMW', 'Mercedes', 'Audi']

// push()
// returns the new length
const newLength = cars.push('Mazda', 'Opel');
console.log(newLength); // 5

// shift()
// moves all indices to the left
// returns the element
const firstElement = cars.shift();
console.log(cars);
console.log(firstElement); // 'BMW

// unshift()
// moves all indices to the right
// returns the new length
const newLength2 = cars.unshift(firstElement);
console.log(cars); // ['BMW', 'Mercedes', 'Audi', 'Mazda', 'Opel']
console.log(newLength2); // 5

// splice()
// returns an array with the removed elements
const removedCars = cars.splice(1, 2);
console.log(removedCars); // ['Mercedes', 'Audi'];
console.log(cars); // ['BMW', 'Mazda', 'Opel']

const result = cars.splice(cars.length, 0, ...removedCars);
console.log(result); // []
console.log(cars); // ['BMW', 'Mazda', 'Opel', 'Mercedes', 'Audi']

// fill()
// returns the reference
const numbers = [1, 2, 3, 4, 5];
const result2 = numbers.fill(0);
console.log(numbers); // [0, 0, 0, 0, 0]
console.log(result2 === numbers); // true
result2[1] = 2;
console.log(numbers); // [0, 2, 0, 0, 0]
console.log(result2); // [0, 2, 0, 0, 0]

numbers.fill(3, 2, 4); // end is exclusive
console.log(numbers); // [0, 2, 3, 3, 0]

numbers.fill(5, 2, 5);
console.log(numbers); // [0, 2, 5, 5, 5]
