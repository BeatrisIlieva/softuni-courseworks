function sayHi(title, name) {
    console.log(`Hi ${title} ${name}, my name is ${this.name}`);
}

const context = {
    name: 'Pesho'
};

const name = 'Gosho';
const title = 'Mr.';

sayHi.call(context, title, name);
sayHi.call(context, ...[title, name]);
sayHi.apply(context, [title, name]);

const greeting = sayHi.bind(context);
 
greeting(title, name);
