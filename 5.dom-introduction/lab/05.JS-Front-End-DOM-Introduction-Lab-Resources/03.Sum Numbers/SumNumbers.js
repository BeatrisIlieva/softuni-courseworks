function calc() {
    const firstNumberElement = document.getElementById('num1');
    const secondNumberElement = document.getElementById('num2');
    const sumElement = document.getElementById('sum');

    const firstNumberValue = firstNumberElement.value;
    const secondNumberValue = secondNumberElement.value;

    sumElement.value = Number(firstNumberValue) + Number(secondNumberValue);
}
