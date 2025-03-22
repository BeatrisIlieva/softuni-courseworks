// Synchronous code -> code that executes sequentially
console.log(1);
console.log(2);
console.log(3);

// Callback Asynchronous code
// addEventListener
// const button = document.querySelector('button');
// button.addEventListener('click', clickHandler);

// function clickHandler(e) {
//     console.log('The button has been clicked');
// }

// Callback Asynchronous code
function executeCode() {
    console.log('Start');

    setTimeout(function () {
        setTimeout(function () {
            return console.log('0 seconds later');
        }, 0);

        afterOneSecond();

        return console.log('3 seconds later');
    }, 3000);

    console.log('End');

    function afterOneSecond() {
        setTimeout(function () {
            return console.log('1 second later');
        }, 1000);

        return afterTwoSeconds();
    }

    function afterTwoSeconds() {
        return console.log('2 second later');
    }

    return undefined;
}

executeCode();
