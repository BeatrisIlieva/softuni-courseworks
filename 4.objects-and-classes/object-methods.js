// Define method in object literal with function expression
const cat = {
    name: 'Navcho',
    //function expression
    makeSound: function () {
        console.log('Meow');
    },
    // arrow function
    play: () => console.log('Playing'),
    // use method notation syntax
    // the property name becomes 'bite'; the function become property value
    bite(value) {
        console.log(`Biting ${value}`);
    },
};

// Invoke method
cat.makeSound();
cat['makeSound']();
let methodName = 'makeSound';
cat[methodName]();

// Add method dynamically
cat.eat = function () {
    console.log('Eating meet');
}; // function expression

console.log(cat);
// {name: 'Navcho', makeSound: ƒ, eat: ƒ}

cat.eat();
// Eating meet

cat.sleep = () => console.log('Sleeping');

console.log(cat);
cat.sleep();

cat.play();

cat.bite('hard');
