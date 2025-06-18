function unknownResponse2(input2: unknown): string {
    if (typeof input2 === 'object' && input2 !== null && !Array.isArray(input2)) {
        if (input2.hasOwnProperty('value') && typeof (input2 as any).value === 'string') {
            return (input2 as any).value;
        }
    }

    return '-';
}


console.log(unknownResponse2({ code: 200, text: 'Ok', value: [1, 2, 3] }));
console.log(
    unknownResponse2({ code: 301, text: 'Moved Permanently', value: 'New Url' })
);
console.log(
    unknownResponse2({
        code: 201,
        text: 'Created',
        value: { name: 'Test', age: 20 }
    })
);
console.log(
    unknownResponse2({ code: 201, text: 'Created', value: 'Object Created' })
);
console.log(unknownResponse2({ code: 404, text: 'Not found' }));
console.log(unknownResponse2({ code: 500, text: 'Internal Server Error' }));