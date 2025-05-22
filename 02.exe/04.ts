type httpCodes = { code: 200 | 201 | 301; text: string };
type httpCodesWithPrintChar = { code: 400 | 404 | 500; text: string; printChars?: number };

function printHttpResponse(httpCode: httpCodes | httpCodesWithPrintChar) {
    switch (httpCode.code) {
        case 200:
        case 201:
        case 301:
            return httpCode.text;
        case 400:
        case 404:
        case 500:
            return httpCode.text.slice(0, httpCode.printChars);
    }
}

console.log(printHttpResponse({ code: 200, text: 'OK' }));
console.log(printHttpResponse({ code: 201, text: 'Created' }));
console.log(printHttpResponse({ code: 400, text: 'Bad Request', printChars: 4 }));
console.log(printHttpResponse({ code: 404, text: 'Not Found' }));
console.log(printHttpResponse({ code: 404, text: 'Not Found', printChars: 3 }));
console.log(printHttpResponse({ code: 500, text: 'Internal Server Error', printChars: 1 }));
