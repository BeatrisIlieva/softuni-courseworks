function unkownReponse(objInput: {
    code: number;
    text: string;
    value?: any;
}): string {
    if (typeof objInput.value === 'string') {
        return objInput.value;
    }

    return '-';
}

console.log(unkownReponse({ code: 200, text: 'Ok', value: [1, 2, 3] }));
console.log(
    unkownReponse({ code: 301, text: 'Moved Permanently', value: 'New Url' })
);
console.log(
    unkownReponse({
        code: 201,
        text: 'Created',
        value: { name: 'Test', age: 20 }
    })
);
console.log(
    unkownReponse({ code: 201, text: 'Created', value: 'Object Created' })
);
console.log(unkownReponse({ code: 404, text: 'Not found' }));
console.log(unkownReponse({ code: 500, text: 'Internal Server Error' }));
