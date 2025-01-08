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
