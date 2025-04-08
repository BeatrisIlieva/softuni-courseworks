function solve(data) {
    class Cat {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        meow() {
            console.log(`${this.name}, age ${this.age} says Meow`);
        }
    }

    const cats = [];

    data.forEach((line) => {
        [catName, catAge] = line.split(' ');

        cats.push(new Cat(catName, catAge));
    });

    cats.forEach((cat) => cat.meow());
}

solve(['Mellow 2', 'Tom 5']);
