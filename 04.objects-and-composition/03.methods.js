/*
    In JS a method is a function that belongs to an object. Methods are actions
    that the objects perform. 
    We can assign to a property-name as a value a property-value a function because functions
    have the characteristic first-class functions - they are treated as any other variable ->
    they can be passed as arguments to other functions, they can be returned as a result 
    from other functions and they can be assigned as a value to a variable.
*/

// Add method to an object with function expression
const cat = {
    name: 'Daisy',
    age: 1,
    //propertyName
    sleep: function () {
        console.log('Sleeping...');
    }
};

// Invoke object method
cat.sleep(); // Sleeping...

// Add method with arrow function
const bird = {
    type: 'pigeon',
    fly: () => console.log('Flying...')
};

bird.fly(); // Flying...

// Add method using method notation
const dog = {
    breed: 'pekingese',
    bark() {
        console.log('Barking...');
    }
};

dog.bark(); // Barking...

dog.eat = () => console.log('eating');
dog.eat(); // eating

dog.chaise = function (catName) {
    console.log(`Chasing ${catName}`);
};

const catName = 'Daisy';
dog.chaise(catName); // Chasing Daisy
