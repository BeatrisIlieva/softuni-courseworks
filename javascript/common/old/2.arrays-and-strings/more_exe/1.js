function solve(data) {
    const username = data.shift();

    for (let i = 0; i < data.length; i++) {
        const arrayEl = data[i].split('');
        const reversedEl = arrayEl.reverse();
        const password = reversedEl.join('');

        if (password === username) {
            return console.log(`User ${username} logged in.`);
        }

        if (i === 3) {
            return console.log(`User ${username} blocked!`);
        }

        console.log('Incorrect password. Try again.');
    }
}

solve(['sunny', 'rainy', 'cloudy', 'sunny', 'not sunny']);
