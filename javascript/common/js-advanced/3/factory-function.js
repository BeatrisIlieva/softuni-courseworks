function catFactory(name, age) {
    let cat = {
        name,
        age,
        sleep() {
            console.log(`${this.name} is sleeping...`);
        },
    };

    return cat;
}

const cat = catFactory('Daisy', 1);
const secondCat = catFactory('Navcho', 9);
cat.sleep();
secondCat.sleep();
