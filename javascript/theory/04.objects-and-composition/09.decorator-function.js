/*
    Decorator function is a function that modifies the original object
*/

function canPrint(device) {
    device.print = function () {
        console.log(`${this.name} is printing page.`);
    };
}

function canScan(device) {
    device.scan = function () {
        console.log(`${this.name} is scanning page.`);
    };
}

const printer = { name: 'Printer' };
canPrint(printer);
printer.print();

const copier = { name: 'Copier' };
canPrint(copier);
canScan(copier);
copier.print(); // Copier is printing page.
copier.scan(); // Copier is scanning page.
