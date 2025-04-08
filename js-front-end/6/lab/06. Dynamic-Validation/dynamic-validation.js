document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const inputElement = document.getElementById('email');

    const pattern = /^[a-z]+@[a-z]+\.[a-z]+$/;

    inputElement.addEventListener('change', e => {
        const input = inputElement.value;

        const isValid = pattern.test(input);

        isValid ? inputElement.classList.remove('error') : inputElement.classList.add('error');
    });
}
