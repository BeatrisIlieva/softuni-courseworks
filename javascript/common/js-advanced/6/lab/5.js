function solution() {
    let result = '';

    function append(string) {
        result += string;
    }

    function removeStart(count) {
        result = result.slice(count);
    }

    function removeEnd(count) {
        result = result.slice(0, result.length - count);
    }

    function print() {
        console.log(result);
    }

    return { append, removeStart, removeEnd, print };
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();

// let secondZeroTest = solution();
// secondZeroTest.append('123');
// secondZeroTest.append('45');
// secondZeroTest.removeStart(2);
// secondZeroTest.removeEnd(1);
// secondZeroTest.print();
