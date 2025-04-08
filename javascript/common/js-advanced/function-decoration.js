function sayHi(title, name) {
    console.log(`Hi ${title} ${name}`);
}

const sayHiToMan = name => sayHi('Mr.', name);

sayHiToMan('Peter');

const sayHiToMan2 = sayHi.bind(null, 'Peter');
sayHiToMan2('Gosho')
