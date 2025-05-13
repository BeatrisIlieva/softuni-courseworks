function getPersonInfo(tupleInput: [string, number]): string {
    const personName = tupleInput[0];
    const personAge = tupleInput[1];

    // if (
    //     tupleInput.length > 2 ||
    //     typeof personName !== 'string' ||
    //     typeof personAge !== 'number'
    // ) {
    //     return 'TS Error';
    // }

    return `Hello, my name is ${personName} and my age is ${personAge}`;
}

console.log(getPersonInfo(['Ivan', 20]));

