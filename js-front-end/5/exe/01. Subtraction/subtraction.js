function subtract() {
    const firstNumber = Number(document.getElementById('firstNumber').value);
    const secondNumber = Number(document.getElementById('secondNumber').value);
    const resultElement = document.getElementById('result');

    const sum = firstNumber - secondNumber;
    resultElement.textContent = sum;
}
