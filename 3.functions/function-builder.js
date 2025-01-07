function loggerBuilder(date) {
    return function (text) {
        console.log(`${date}: ${text}`);
    };
}

// loggerBuilder returns the function it gets assigned to the variable 'todayLogger'
// 'todayLogger' is now a function that accepts as param the text 'Today'
// It remembers that parameter 'date'
const todayLogger = loggerBuilder('07.01.2025');
todayLogger('Today');

const yesterdayLogger = loggerBuilder('06.01.2025');
yesterdayLogger('Yesterday');

// Builder function is a function that builds another function that we use after that
// The result of it is the another function, the another function is the return value
// The another function is not executed it is just a reference
// That inner function has access to the builder parameters and to its own

console.log(todayLogger === yesterdayLogger);
// false
// !!! every time 'loggerBuilder' is called it creates a new value of the inner function
// and returns a new reference to that function in memory
// so todayLogger and yesterdayLogger are two different functions