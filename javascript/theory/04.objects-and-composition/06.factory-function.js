/*
    A Factory function, is a function that when invoked, 
    it creates and returns a new object.

*/

function catFactory(name, age) {
    const cat = {
        name, 
        age,
        eat() {
            console.log(`${this.name} is eating...`);
        }
    }

    cat.sleep = function(){
        console.log(`${this.name} is sleeping...`);
    }

    cat.meow = () => console.log(`${this.name} is meowing...`);

    return cat;
}

const cat = catFactory('Daisy', 1);
cat.sleep(); // Daisy is sleeping...
cat.eat(); // Daisy is eating...
cat.meow(); // undefined is meowing...

const cat2 = catFactory('Tom', 3);
cat2.sleep(); // Tom is sleeping...
cat2.eat(); // Tom is eating...
cat2.meow(); // undefined is meowing...
