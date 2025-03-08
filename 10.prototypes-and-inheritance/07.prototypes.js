/*  
    JS is not object oriented language -> it is prototype oriented language;
    A prototype gives us a way to create relation between 
    objects so they can use each other's MEMBERS (methods and properties) as their own.

    In OOP inheritance, we ask is a cat IS animal;
    In prototype inheritance, if a cat HAS tail;

    The prototype is a reference to another object. 
    The objects are just linked -> they are not nested.
    This is memory efficient.
*/

const smartPerson = {
    writeDissertation() {
        console.log('Dissertation');
    }
};

const buddy = {
    pen: true,
    writeEssay() {
        console.log('ESE');
    }
};

Object.setPrototypeOf(buddy, smartPerson);

const me = {
    paper: true
};

// set buddy as a prototype of me
Object.setPrototypeOf(me, buddy);

console.log(me.paper); // true
console.log(me.pen); // true
console.log(me); // {paper: true}

// get prototype
console.log(me.__proto__); // {pen: true, writeEssay: ƒ}
console.log(me.__proto__ === buddy); // true

me.writeEssay(); //  ESE

// how to check if a property or a method is mine
console.log(me.hasOwnProperty('pen')); // false
console.log(me.hasOwnProperty('paper')); // true

// get method of prototype chain
me.writeDissertation(); // Dissertation

// iterate all members including prototype members
for (const key in me) {
    console.log(key);
}
// paper
// pen
// writeEssay
// writeDissertation

// Objects have prototype; functions do not (they do not have .__proto__ but .prototype)
// Function prototype property - functions cannot have prototypes
function writeEssay() {
    console.log('ese');
}

console.log(writeEssay.prototype); // {constructor: ƒ}

// each function has a prototype property that refers tio an object
// the function does not inherit it

// legal way to get prototype
console.log(Object.getPrototypeOf(me)); // {pen: true, writeEssay: ƒ}

const firstCat = {
    name: 'Daisy',
    meow() {
        console.log(`${this.name} meow...`);
    }
};

const secondCat = {
    name: 'Tom',
    meow() {
        console.log(`${this.name} meow...`);
    }
};

// here we go against the principle DRY
// we defined copy-paste method
// they exist as separate functions in memory at different places in memory

// fix the problem
// create base cat

const firstCat2 = {
    name: 'Daisy'
};

const secondCat2 = {
    name: 'Tom'
};

const cat = {
    meow() {
        console.log(`${this.name} meow...`);
    }
};

Object.setPrototypeOf(firstCat2, cat);
Object.setPrototypeOf(secondCat2, cat);

// in this case both cats use one and the same method meow
firstCat2.meow(); // Daisy meow...
secondCat2.meow(); // Tom meow...
