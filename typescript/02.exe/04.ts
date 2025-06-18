interface httpCodes {
    code: 200 | 201 | 404;
    text: 'OK' | 'Created' | 'Not Found';
}

interface httpCodesWithPrintChars {
    code: 400 | 404 | 500;
    text: 'Bad Request' | 'Not Found' | 'Internal Server Error';
    printChars?: number;
}

function printResponseStatus(httpCode: httpCodes | httpCodesWithPrintChars): string {
    switch (httpCode.code) {
        case 200:
        case 201:
        case 404:
            return httpCode.text;
        case 400:
        case 500:
            return httpCode.text.slice(0, httpCode.printChars);
    }
}

console.log(printResponseStatus({ code: 200, text: 'OK' }));
console.log(printResponseStatus({ code: 201, text: 'Created' }));
console.log(printResponseStatus({ code: 400, text: 'Bad Request', printChars: 4 }));
console.log(printResponseStatus({ code: 404, text: 'Not Found' }));
console.log(printResponseStatus({ code: 404, text: 'Not Found', printChars: 3 }));
console.log(
    printResponseStatus({ code: 500, text: 'Internal Server Error', printChars: 1 })
);
