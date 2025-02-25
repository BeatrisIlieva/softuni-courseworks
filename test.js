function sayHi(){
    console.log(`my name ${this.name}`);
}


let person = {
    name: 'Pesho',
    saySomething(){
        sayHi()
    }
}

person.saySomething()