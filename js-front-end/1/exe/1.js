function fancySolve(age) {
    const ageCategories = [
        { min: 0, max: 2, category: 'baby' },
        { min: 3, max: 13, category: 'child' },
        { min: 14, max: 19, category: 'teenager' },
        { min: 20, max: 65, category: 'adult' },
        { min: 66, max: Infinity, category: 'elder' },
    ];

    const result =
        ageCategories.find(({ min, max }) => age >= min && age <= max)?.category || 'out of bounds';

    console.log(result);
}

fancySolve(-1);
