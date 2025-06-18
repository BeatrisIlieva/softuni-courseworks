interface Params {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    middleName?: string;
    hobbies?: string[];
    workInfo?: [string, number];
}

function summarizePerson(personInfo: Params): [number, string, number, string, string] {
    const fullName = personInfo.middleName
        ? `${personInfo.firstName} ${personInfo.middleName} ${personInfo.lastName}`
        : `${personInfo.firstName} ${personInfo.lastName}`;
    const hobbiesStr =
        personInfo.hobbies && personInfo.hobbies.length > 0
            ? personInfo.hobbies.join(', ')
            : '-';
    const workStr = personInfo.workInfo
        ? `${personInfo.workInfo[0]} -> ${personInfo.workInfo[1]}`
        : '-';

    return [personInfo.id, fullName, personInfo.age, hobbiesStr, workStr];
}

console.log(
    summarizePerson({
        id: 12,
        firstName: 'Eliot',
        lastName: 'Des',
        age: 20,
        middleName: 'Braylen',
        hobbies: ['tennis', 'football', 'hiking'],
        workInfo: ['Sales Consultant', 2500]
    })
);

