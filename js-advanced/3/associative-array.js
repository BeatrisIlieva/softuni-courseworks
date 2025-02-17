const phoneBook = {
    'Ivan Ivanov': '+359888888888',
    'Todor Ivanov': '+359888888887',
    'Georgi Ivanov': '+359888888886',
};

for (const name in phoneBook) {
    console.log(phoneBook[name]);
}

let values = Object.values(phoneBook);
console.log(values);

let keys = Object.keys(phoneBook);
console.log(keys);

for (const name of keys) {
    console.log(phoneBook[name]);
}

for (const name in phoneBook) {
    console.log(phoneBook[name]);
}

let entries = Object.entries(phoneBook);
console.log(entries);

for (const [name, phone] of entries) {
    console.log(`${name}: ${phone}`);
}
