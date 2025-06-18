function getPersonInfo(tupleInput: [string, number]): string {
    const personName = tupleInput[0];
    const personAge = tupleInput[1];

    return `Hello, my name is ${personName} and my age is ${personAge}`;
}

console.log(getPersonInfo(['Ivan', 20]));

