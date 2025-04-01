function createFormatter(separator, symbol, symbolFirst) {
    return currencyFormatter.bind(
        null,
        separator,
        symbol,
        symbolFirst
    );
}

const bgFormatter = createFormatter(',', 'lv.', false);
console.log(bgFormatter(10)); // 10,00 lv.

const dollarFormatter = createFormatter('.', '$', true);
console.log(dollarFormatter(10)); // $ 10.00

function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;

    result += value.toFixed(2).substr(-2, 2);

    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

// const result = currencyFormatter(',', 'lv.', false, 10);
// console.log(result); // 10,00 lv.
