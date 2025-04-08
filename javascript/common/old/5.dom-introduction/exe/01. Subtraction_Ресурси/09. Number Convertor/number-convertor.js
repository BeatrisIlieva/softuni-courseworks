function solve() {
    const input = Number(document.getElementById('input').value);
    const resultElement = document.getElementById('result');
    const convertTo = document.getElementById('selectMenuTo').value;

    switch (convertTo) {
        case 'binary':
            resultElement.value = input.toString(2);
            break;
        case 'hexadecimal':
            resultElement.value = input.toString(16).toUpperCase();
            break;
    }
}
