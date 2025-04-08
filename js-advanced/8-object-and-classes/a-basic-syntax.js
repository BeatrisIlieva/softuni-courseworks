class Cat {
    constructor(name) {
        this.name = name;
    }

    // define instance method
    sleep(){
        console.log(`${this.name}: zzzz`);
    }

    // define static method
    static staticMethod(){
        console.log(`This can be called only though the class ${this.name}`);
    }
}

const myCat = new Cat('Daisy');
myCat.sleep()

console.log(myCat instanceof Cat);

Cat.staticMethod()