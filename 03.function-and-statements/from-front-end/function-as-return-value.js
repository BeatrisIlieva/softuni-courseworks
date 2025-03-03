function timeLogger(date, text) {
    console.log(`${date}: ${text}`);
}

function timeLoggerBuilder(date) {
    return function (text) {
        timeLogger(date, text);
    };
}

const todayLogger = timeLoggerBuilder('02.01.2009');
const yesterdayLogger = timeLoggerBuilder('01.01.2009');
todayLogger('Hi, Pesho!');
yesterdayLogger('Hi, Pesho!');

// every time the timeLoggerBuilder returns a new reference - a new function
console.log(todayLogger === yesterdayLogger); // false
