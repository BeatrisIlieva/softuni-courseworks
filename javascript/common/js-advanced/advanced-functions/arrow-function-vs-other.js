let person1 = {
    name: 'Pesho',

    saySomething() {
        function sayHi() {
            console.log(`Hi my names is ${this.name}`);
        }

        sayHi();
    }
};

person1.saySomething();
// Hi my names is undefined

let person2 = {
    name: 'Gosho',

    saySomething() {
        sayHi = () => {
            console.log(`Hello my name  is ${this.name}`);
        };

        sayHi();
    }
};

person2.saySomething();
// Hello my name  is Gosho
