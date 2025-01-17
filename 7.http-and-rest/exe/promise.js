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
    .then((message) => {
        console.log(message);
    })
    .catch((message) => {
        console.log(message);
    })
    .finally(() => {
        console.log('Love always win');
    })
