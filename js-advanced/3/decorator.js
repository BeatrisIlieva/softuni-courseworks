// The decorator functions mutate the original reference by attaching new functionality

function canPrint(device) {
    device.print = function () {
        console.log(`${this.name} is printing a page`);
    };
}

function canScan(device) {
    device.scan = function () {
        console.log(`${this.name} is scanning a page`);
    };
}

let printer = { name: 'Printer' };
canPrint(printer);
printer.print();

let copier = { name: 'Copier' };
canPrint(copier);
canScan(copier);
copier.scan();
copier.print();
