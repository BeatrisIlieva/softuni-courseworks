function summarizePerson(
    personId: number,
    firstName: string,
    lastName: string,
    age: number,
    middleName?: string,
    hobbies?: string[],
    workInfo?: (string | number)[]
): [number, string, number, string, string] {
    let personNames = '';
    if (middleName) {
        personNames = `${firstName} ${middleName} ${lastName}`;
    } else {
        personNames = `${firstName} ${lastName}`;
    }

    let personHobbies = '';
    if (!hobbies || hobbies.length === 0) {
        personHobbies += '-';
    } else {
        personHobbies += hobbies.join(', ');
    }

    let personWorkInfo = '';
    if (!workInfo) {
        personWorkInfo += '-';
    } else {
        personWorkInfo += `${workInfo[0]} -> ${workInfo[1]}`;
    }

    return [personId, personNames, age, personHobbies, personWorkInfo];
}

console.log(
    summarizePerson(
        12,
        'Eliot',
        'Des',
        20,
        'Braylen',
        ['tennis', 'football', 'hiking'],
        ['Sales Consultant', 2500]
    )
);

console.log(
    summarizePerson(20, 'Mary', 'Trent', 25, undefined, ['fitness', 'rowing'])
);

console.log(summarizePerson(21, 'Joseph', 'Angler', 28));

console.log(summarizePerson(21, 'Kristine', 'Neva', 23, ''));
