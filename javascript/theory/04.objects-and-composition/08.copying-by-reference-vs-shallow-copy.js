const firstCat = {
    name: 'Daisy',
    age: 1,
    actions: {
        common: ['sleep', 'eat'],
        specific: ['lapping']
    }
};

const secondCat = {
    name: 'Tom',
    age: 3,
    actions: {
        common: ['sleep', 'eat'],
        specific: ['biting']
    }
};

const dynamicProperty = 'gender';

const copyCatByReference = firstCat;
console.log(copyCatByReference === firstCat); // true
copyCatByReference.age = 18;
copyCatByReference.actions.common.push('meowing');
firstCat[dynamicProperty] = 'Female';
console.log(copyCatByReference.gender); // Female
console.log(firstCat);
// with copying by reference every modification made on eny of the
// objects will be reflected on the another one
// {
//     name: 'Daisy',
//     age: 18,
//     actions: { common: [ 'sleep', 'eat', 'meowing' ], specific: [ 'lapping' ] },
//     gender: 'Female'
// }

const copyCatShallow = { ...secondCat };
console.log(copyCatShallow === secondCat); // false
copyCatShallow.age = 8;
copyCatShallow.actions.common.push('meowing');
console.log(secondCat);
// when making a shallow copy only the nested reference data types will be
// modified by reference
// {
//     name: 'Tom',
//     age: 3,
//     actions: { common: [ 'sleep', 'eat', 'meowing' ], specific: [ 'biting' ] }
// }

const thirdCat = {
    name: 'Mouse',
    actions: {
        common: ['sleep', 'eat'],
        specific: ['lapping']
    }
};

function deepClone(obj) {
    const objType = typeof obj;

    if (objType === null || objType !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const result = obj.map(el => deepClone(el));
        return result;
    }

    const copy = {};
    for (let key in obj) {
        const value = obj[key];
        copy[key] = deepClone(value);
    }
    return copy;
}

const deepCopy = deepClone(thirdCat);

console.log(deepCopy);
console.log(thirdCat);
console.log(deepCopy === thirdCat);
