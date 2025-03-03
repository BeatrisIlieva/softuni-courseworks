function factory(animalActions, animalLibrary) {
    const resultArray = [];

    for (const animal of animalLibrary) {
        const resultObject = { ...animal.template };

        for (const action of animal.actions) {
            resultObject[action] = animalActions[action];
        }

        resultArray.push(resultObject);
    }

    return resultArray;
}

const animalActions = {
    walk: function () {
        console.log(`${this.name} can walk.`);
    },

    swim: function () {
        console.log(`${this.name} can swim.`);
    },

    fly: function () {
        console.log(`${this.name} can fly.`);
    }
};

const animalLibrary = [
    {
        template: { name: 'Elephant' },
        actions: ['walk']
    },

    {
        template: { name: 'Shark' },
        actions: ['swim']
    },

    {
        template: { name: 'Duck' },
        actions: ['walk', 'swim', 'fly']
    }
];

console.log(factory(animalActions, animalLibrary));

// [
//     { name: 'Elephant', walk: [Function: walk] },
//     { name: 'Shark', swim: [Function: swim] },
//     {
//       name: 'Duck',
//       walk: [Function: walk],
//       swim: [Function: swim],
//       fly: [Function: fly]
//     }
// ]
