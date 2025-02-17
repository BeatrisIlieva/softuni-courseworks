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
