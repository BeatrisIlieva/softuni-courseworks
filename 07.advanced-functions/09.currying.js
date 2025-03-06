const sum = (a, b, c) => a + b + c;

console.log(sum(1, 2, 3)); // 6

const currySum = a => b => c => a + b + c;

console.log(currySum(1)(2)(3)); // 6

function currySum2(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}

console.log(currySum2(1)(2)(3)); // 6

const currySum3 = function (a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
};

console.log(currySum3(1)(2)(3)); // 6

