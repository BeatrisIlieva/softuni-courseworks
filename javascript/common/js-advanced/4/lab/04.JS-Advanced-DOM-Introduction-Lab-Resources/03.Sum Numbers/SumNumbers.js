function calc() {
    const firstNumberElement = document.getElementById('num1');
    const secondNumberElement = document.getElementById('num2');
    const sumElement = document.getElementById('sum');

    const firstNumber = Number(firstNumberElement.value);
    const secondNumber = Number(secondNumberElement.value);
    const sum = firstNumber + secondNumber;

    sumElement.value = sum;
}
