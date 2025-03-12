// we create a new promise
// it accepts an executor function
// the executor function accepts two parameters -> two functions -> resolve and reject
const weddingPromise = new Promise((resolve, reject) => {
    //reject accepts a reason and returns nothing
    if (Math.random() < 0.5) {
        return reject("Sorry, it's me");
    }

    // resolve is a function that accepts a value and returns nothing
    setTimeout(() => {
        resolve('Just married!');
    }, 5000);
});

weddingPromise
    .then(message => {
        console.log(message);
    })
    .catch(message => {
        console.log(message);
    })
    .finally(() => {
        console.log('Love always wins!');
    });

// promise all
// all promises should resolve
// if one rejects always will be failed
const createTimeoutPromise = function (message, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(message);
        }, time);
    });
};

const groupPromise = Promise.all([
    Promise.resolve('First promise'),
    createTimeoutPromise('Second Promise', 3000),
    createTimeoutPromise('Third promise', 1000)
]);

groupPromise.then(values => {
    console.log(values); // (3) ['First promise', 'Second Promise', 'Third promise']
});
