let names = ['Elen', 'Mark', 'Stephen'];
names[10] = 'Peter';

console.log(names.length);
// 11

console.log(names);
// This is means sparse -> at the place of the dots there are undefined;
// no memory is allocated fo the undefined
// ['Elen', 'Mark', 'Stephen', …, 'Peter']

console.log(names[4]);
// undefined

let numbers = [1, 2, 3];
console.log(numbers.length);
// 3

numbers.length = 10;
console.log(numbers.length);
// 10
console.log(numbers);
// [1, 2, 3, …]

numbers.length = 2;
console.log(numbers);
// [1, 2]

let cars = ['Audi', 'BMW', 'Mercedess'];

let carsLength = cars.push('Toyota', 'Opel');

console.log(carsLength);
// 5

let cats = ['Daisy', 'Tom'];

cats.pop();

cats.length = 2;

console.log(cats);
// ['Daisy', empty]

let animals = ['dogs', 'mouses', 'cats'];
let deletedAnimals = animals.splice(1, 1);
console.log(deletedAnimals);
// ['mouses']

animals.splice(1, 0, 'elephant');
console.log(animals);
// ['dogs', 'elephant', 'cats']

let professions = ['teacher', 'professor', 'accountant', 'driver'];

professions.splice(1, 2, 'musician', 'dentist');

console.log(professions);
// ['teacher', 'musician', 'dentist', 'driver']

let musicians = ['guitarist', 'singer'];
let reversedMusicians = musicians.reverse();

console.log(musicians);
// ['singer', 'guitarist']
console.log(reversedMusicians);
// ['singer', 'guitarist']
console.log(reversedMusicians === reversedMusicians);
// true -> the two arrays point to one and the same address in the memory
// !! it creates a new variables that point to the same address in memory
// points to the same value that is stored in the heap

let countries = ['Bulgaria', 'Japan', 'UK', 'China'];

let middleCountries = countries.slice(1, 2); // the second index is Exclusive
console.log(middleCountries);
// ['Japan']

console.log(countries);
// ['Bulgaria', 'Japan', 'UK', 'China']
// Slice is Non mutating method

const newCountries = countries.slice();

console.log(newCountries);
// ['Bulgaria', 'Japan', 'UK', 'China'] -> it creates a shallow copy

console.log(countries === newCountries);
// false -> the new countries is now a new array with its own reference in memory

let cities = ['Sofia', 'Varna', 'Burgas', 'Plovdiv'];

let newCities = cities.slice(1);
console.log(newCities);
// ['Varna', 'Burgas', 'Plovdiv'
console.log(cities.includes('Plovdiv', 1));
// true
console.log(cities.indexOf('Belgrade'));
// - 1

let varnaElement = cities.find((city) => city[0] === 'V');
// city => city === 'Varna' -> predicate
// gives me the first city which first letter is 'V'
console.log(varnaElement);


// find with indexOf all occurrences
let continents = [
    'Europe',
    'Asia',
    'Africa',
    'Europe',
    'South America',
    'Europe',
    'North America',
    'Antarctica',
    'Australia',
];

let indexOfEurope = continents.indexOf('Europe');

while (indexOfEurope >= 0) {
    console.log(indexOfEurope);

    indexOfEurope = continents.indexOf('Europe', indexOfEurope + 1);
}
