function sayHi(title, name) {
    console.log(`Hello ${title} ${name}, my name is ${this.name}`);
}

const context = {
    name: 'Maryika'
};

sayHi.call(context, 'Mr', 'Pesho');
sayHi.call(context, ...['Mr', 'Pesho']);

sayHi.apply(context, ['Mr', 'Gosho']);

const modifiedSayHi = sayHi.bind(context, 'Mr', 'Ivan');
modifiedSayHi();
