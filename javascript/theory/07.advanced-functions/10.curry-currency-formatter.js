function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;

    result += value.toFixed(2).substr(-2, 2);

    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}
const curryCurrency = separator => symbol => symbolFirst => value =>
    currencyFormatter(separator, symbol, symbolFirst, value);

const bgFormatter = curryCurrency(',')('lv.')(false);
console.log(bgFormatter(10)); // 10,00 lv.

const usdFormatter = curryCurrency('.')('$')(true);
console.log(usdFormatter(10)); // $ 10.00

function curryCurrency2(separator) {
    return function (symbol) {
        return function (symbolFirst) {
            return function (value) {
                return currencyFormatter(
                    separator,
                    symbol,
                    symbolFirst,
                    value
                );
            };
        };
    };
}

const poundFormatter = curryCurrency2('.')('GBP')(true);
console.log(poundFormatter(10)); // GBP 10.00
