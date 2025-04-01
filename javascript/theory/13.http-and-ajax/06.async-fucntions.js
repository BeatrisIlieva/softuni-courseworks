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
        }, 3000);
    });
}

async function startMission() {
    try {
        const result = await launchRocket();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

startMission();

// const promise = launchRocket();

// promise
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });
