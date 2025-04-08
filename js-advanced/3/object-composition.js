let student = {
    firstName: 'Maria',
    lastName: 'Lopez',
    age: 22,
    location: { lat: 42, lng: 43 },
};

console.log(student.location.lat); // 42

function print() {
    console.log(`${this.name} is printing a page`);
}

function scan() {
    console.log(`${this.name} is scanning a page`);
}

const printer = {
    name: 'Printer',
    print,
};

printer.print();

const scanner = {
    name: 'Scanner',
    scan
}

scanner.scan()

const copier = {
    name: 'Copier',
    print,
    scan,
}

copier.print();
copier.scan();