// Promise use the promise class
// Create a new promise
// We create  a new instance of the class promise and pass and executor function as parameter

// The executor function accepts two parameters
// Both parameters are functions
// The first one is resolve -> it accepts a value and returns undefined
// The second one is reject -> it accepts reason and returns undefined

function launchRocket() {
    return new Promise((resolve, reject) => {
        console.log('🚀 Initiating launch sequence...');

        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve(
                    '🎉 The rocket has successfully landed on Mars! 🏆'
                );
            } else {
                reject(
                    '🔥 Mission failed! The rocket exploded in space. 💥'
                );
            }
        }, 3650);
    });
}

// const promise = launchRocket();

// // When the promise is resolved, then we would be landed on Mars
// // we pass to the  a callback function to be executed when the promise is resolved
// promise
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// Promise all resolves only when all promises resolve and rejects even if only one promise is rejected
const firstMission = launchRocket();
const secondMission = launchRocket();
const thirdMission = launchRocket();
const fourthMission = launchRocket();

// Promise.all([
//     firstMission,
//     secondMission,
//     thirdMission,
//     fourthMission
// ])
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

Promise.allSettled([
    firstMission,
    secondMission,
    thirdMission,
    fourthMission
])
    .then(result => console.log(result))
    .catch(err => console.log(err));
