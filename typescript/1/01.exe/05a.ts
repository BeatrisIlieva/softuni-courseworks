function summarizePerson2(
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    middleName?: string,
    hobbies?: string[],
    workInfo?: [string, number]
): [number, string, number, string, string] {
    const personName = middleName
        ? `${firstName} ${middleName} ${lastName}`
        : `${firstName} ${lastName}`;

    const personHobbies = hobbies && hobbies.length > 0 ? hobbies.join(', ') : '-';
    const personWorkInfo = workInfo ? `${workInfo[0]} -> ${workInfo[1]}` : '-';

    return [id, personName, age, personHobbies, personWorkInfo];
}

console.log(summarizePerson2(21, 'Joseph', 'Angler', 28));
