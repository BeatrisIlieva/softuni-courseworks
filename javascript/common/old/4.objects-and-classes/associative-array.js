const fullName = 'Petar Petrov';
const fullName2 = 'Georgi Georgiev';

const phoneBook = {
    'Ivan Ivanov': '+35987645447',
    [fullName]: '+35987645448',
};

phoneBook[fullName2] = '+35987645449';
phoneBook['Ginka Goceva'] = '+3598764541';

console.log(phoneBook);
//{Ivan Ivanov: '+35987645447', Petar Petrov: '+35987645448', Georgi Georgiev: '+35987645449', Ginka Goceva: '+3598764541'}

// we use for in to loop though objects and associative arrays
// it goes through the keys
for (let name in phoneBook) {
    console.log(`${name} - ${phoneBook[name]}`);
}

// Ivan Ivanov - +35987645447
// Petar Petrov - +35987645448
// Georgi Georgiev - +35987645449
// Ginka Goceva - +3598764541

const names = ['Pesho', 'Gosho', 'Stamat'];

// do not use for array
for (let name in names) {
    console.log(name);
}

// 0
// 1
// 2

if (phoneBook['Ivan Ivanov']) {
    console.log('yes');
}

if (phoneBook.hasOwnProperty('Ivan Ivanov')) {
    console.log('yes');
}
