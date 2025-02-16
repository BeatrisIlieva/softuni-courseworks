const phoneBook = {
    'Bvan Ivanov': '+35987645447',
    'Avan Ivanov': '+35987645447',
    'Cvan Ivanov': '+35987645447',
};

let sortedArray = Object.entries(phoneBook).sort((a, b) => a[0].localeCompare(b[0]));
console.log(JSON.stringify(sortedArray));
console.log(phoneBook);

const sortedObj = Object.fromEntries(sortedArray);
console.log(JSON.stringify(sortedObj));

let sortedArray2 = Object.entries(phoneBook).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
console.log(JSON.stringify(sortedArray2));
