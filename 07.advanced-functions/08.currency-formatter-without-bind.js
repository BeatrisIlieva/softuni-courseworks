const createBgFormatter = value =>
    currencyFormatter(',', 'lv.', false, value);

const bgFormatter = createBgFormatter(10);
console.log(bgFormatter); // 10,00 lv.

const createDollarFormatter = value =>
    currencyFormatter('.', '$', true, value);

const dollarFormatter = createDollarFormatter(10);
console.log(dollarFormatter); // $ 10.00

function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;

    result += value.toFixed(2).substr(-2, 2);

    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}
