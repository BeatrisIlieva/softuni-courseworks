let names = ['Elen', 'Mark', 'Stephen'];
names[10] = 'Peter';

console.log(names.length);
// 11

console.log(names);
// This means sparse -> at the place of the dots there are undefined;
// no memory is allocated for the undefined
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
// !! it creates a new variable that points to the same address in memory
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

// we use forEach when we want to apply an action for each element in an array
// ! this is an expression
continents.forEach((continent) => console.log(continent));

// we use for of when we want to apply an action for each element in an array
// ! this is a statement
for (const continent of continents) {
    console.log('---');
    console.log(continent);
}

// Map creates a new array - new reference that contains the same number of elements
// that are derivative of the original elements
let integers = [1, 2, 3, 4, 5];
let doubleNumbers = integers.map((num) => num * 2);
console.log(doubleNumbers);

//Filter

let oddNumber = integers.filter((number) => number % 2 !== 0);
console.log(oddNumber);

//Reduce

let sum = integers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);

// Strings

// All string methods are non mutable because strings are immutable

let name = 'Pesho';
name += ' e super';
console.log(name);
// Pesho e super
// !!! The variable name does not change its value ->
// it disappears and a new variable gets created

// concat does the same
let greet = 'Hi';
greet = greet.concat(', there!');
console.log(greet);
// Hi, there!

// indexOf
let text = 'I am JavaScript developer';
let indexOfJava = text.indexOf('Java'); // it is case Sensitive
console.log(indexOfJava);

// substring
let theBestLanguage = text.substring(indexOfJava, 15);
console.log(theBestLanguage);

//replace
let pythonText = text.replace('JavaScript', 'Python');
console.log(pythonText);

//replaceAll
let textToReplace = 'Java java Java java';
let replacedText = textToReplace.replaceAll('java', 'Java');
console.log(replacedText);

//split ! needs a separator
let textToSplit = 'I am new developer';
let words = textToSplit.split(' ');
console.log(words);
// if there is ' ' in the text it will enter as an empty string

// includes
console.log(text.includes('JavaScript'));

// repeat

console.log('tro'.repeat(10));

// startsWith

console.log(text.startsWith('I am'));

// padStart
console.log('10'.padStart(10, '0'));

// Reversed text
let textToReverse = 'I am JavaScript developer';
let reversedString = textToReverse.split('').reverse().join('');
console.log(reversedString);

// sort -> it mutates the original array and create a new variables
// that points to the same reference in the memory
// it returns a reference to the same array
//it returns it so as we could chain it for example with map
// otherwise there is no point to save it in a new variable
let notSortedArray = ['Bob', 'Ema', 'Alex'];
let sortedArray = notSortedArray.sort();
console.log(notSortedArray);
console.log(sortedArray);
console.log(notSortedArray === sortedArray);

//(3) ['Alex', 'Bob', 'Ema']
//(3) ['Alex', 'Bob', 'Ema']
//true

// it sorts by ascii table
const namesToSort = ['Bob', 'Ema', 'alex', 'Abdrew'];

namesToSort.sort().forEach((name, index) => {
    console.log(`${index + 1}.${name}`);
});

// 1.Bob
//2.Ema
//3.alex !!!

//localeCompare

namesToSort.sort((a, b) => a.localeCompare(b)).forEach((name, index) => {
    console.log(`${index + 1}.${name}`)
})

// desc

namesToSort.sort((a, b) => b.localeCompare(a)).forEach((name, index) => {
    console.log(`${index + 1}.${name}`)
})

