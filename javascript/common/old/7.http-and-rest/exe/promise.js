// pass to the constructor a function that accepts two parameters - functions -> resolve and reject
// resolve and reject are also function
// resolve accepts a value and does not return anything
// reject accepts a reason and does not return anything
const weddingPromise = new Promise((resolve, reject) => {
    if (Math.random() < 0.3) {
        return reject(`Sorry, It's me!`);
    }

    setTimeout(() => {
        resolve('Just married.');
    }, 1000);
});

// with 'then' we say -> when the promise is fulfilled
// we pass to then a function that needs to accept a value
weddingPromise
    .then((value) => {
        console.log(value);
    })
    .catch((reason) => {
        console.log(reason);
    })
    .finally(() => {
        console.log('Love always win');
    });

// Always rejecting promise
const rejectingPromise = Promise.reject('Next time');
rejectingPromise.catch((message) => console.log(message));

// Multiple parallel promises

const createTimeoutPromise = function (message, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(message);
        }, time);
    });
};

const groupPromise = Promise.all([
    Promise.resolve('First promise'),
    createTimeoutPromise('Second promise', 3000),
    createTimeoutPromise('Third promise', 1000),
    Promise.reject('sorry')
]);

groupPromise
    .then((values) => console.log(values))
    .catch((error) => console.log(error))
// ['First promise', 'Second promise', 'Third promise']

const secondGroupPromise = Promise.allSettled([
    Promise.resolve('First promise'),
    createTimeoutPromise('Second promise', 3000),
    createTimeoutPromise('Third promise', 1000),
    Promise.reject('sorry')
]);

secondGroupPromise
    .then((values) => console.log(values))
    .catch((error) => console.log(error))
// [{…}, {…}, {…}, {…}]