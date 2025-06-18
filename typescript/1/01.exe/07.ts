function unkownReponse(arg: unknown): string {
    if ('value' in (arg as any) && typeof (arg as any).value === 'string') {
        return (arg as any).value;
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
