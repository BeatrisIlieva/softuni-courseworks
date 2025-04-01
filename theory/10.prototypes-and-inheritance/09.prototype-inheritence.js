function Animal(species) {
    this.species = species;
}

Animal.prototype.eat = function() {
    console.log(`${this.species} eats meet.`)
}

function Cat(name, breed) {
    this.name = name;
    this.breed = breed;

    Animal.call(this, 'Predator');
}

const catPrototype = {};
Object.setPrototypeOf(catPrototype, Animal.prototype);
Cat.prototype = catPrototype;

// Cat.prototype = Object.create(Animal.prototype);

Cat.prototype.meow = function() {
    console.log(`${this.name} says meow.`)
}

const firstCat = new Cat('Daisy', 'Angora');
console.log(firstCat); // Cat {name: 'Daisy', breed: 'Angora', species: 'predator'}
// species is OWN property

// we access the methods through the two prototypes
firstCat.meow(); // Daisy says meow.
firstCat.eat(); // Predator is eats meet.

console.log(firstCat instanceof Cat); // true
console.log(firstCat instanceof Animal); // true

// instance of check the prototype

const secondCat = new Cat('Tom', 'Angora');

console.log(firstCat.meow === secondCat.meow); // true