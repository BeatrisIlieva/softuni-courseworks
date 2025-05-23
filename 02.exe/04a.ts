type Httpresponse2 = {
    code: number;
    text: string;
};

type ExtendedHttpResponse2 = {
    printChars?: number;
};

type FullHttpResponse2 = Httpresponse2 & ExtendedHttpResponse2;

function printHttpResponse2(response: FullHttpResponse2) {
    if (response.printChars) {
        return response.text.slice(0, response.printChars);
    }

    return response.text;
}

console.log(printHttpResponse2({ code: 200, text: 'OK' }));
console.log(printHttpResponse2({ code: 201, text: 'Created' }));
console.log(printHttpResponse2({ code: 400, text: 'Bad Request', printChars: 4 }));
console.log(printHttpResponse2({ code: 404, text: 'Not Found' }));
console.log(printHttpResponse2({ code: 404, text: 'Not Found', printChars: 3 }));
console.log(printHttpResponse2({ code: 500, text: 'Internal Server Error', printChars: 1 }));
