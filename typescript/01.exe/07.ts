function unkownResponse(args: unknown): string {
    if ('value' in (args as any) && typeof (args as any).value === 'string') {
        return (args as any).value;
    }

    return '-';
}

console.log(unkownResponse({ code: 200, text: 'Ok', value: [1, 2, 3] }));
console.log(unkownResponse({ code: 404, text: 'Not found' }));
console.log(unkownResponse({ code: 301, text: 'Moved Permanently', value: 'New Url' }));
