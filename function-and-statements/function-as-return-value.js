function timeLogger(date, text) {
    console.log(`${date}: ${text}`);
}

function timeLoggerBuilder(date) {
    return function (text) {
        timeLogger(date, text);
    };
}

const logger = timeLoggerBuilder('01.01.2009');
logger('Hi, Pesho!')