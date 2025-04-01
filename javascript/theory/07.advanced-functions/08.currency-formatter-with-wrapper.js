function createBgFormatter(separator, symbol, symbolFirst) {
    return function (value) {
        return currencyFormatter(
            separator,
            symbol,
            symbolFirst,
            value
        );
    };
}

const bgFormatter = createBgFormatter(',', 'lv.', false);
console.log(bgFormatter(10)); // 10,00 lv.

function createDollarFormatter(separator, symbol, symbolFirst) {
    return function (value) {
        return currencyFormatter(
            separator,
            symbol,
            symbolFirst,
            value
        );
    };
}

const dollarFormatter = createDollarFormatter('.', '$', true);
console.log(dollarFormatter(10)); // $ 10.00

function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;

    result += value.toFixed(2).substr(-2, 2);

    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}
