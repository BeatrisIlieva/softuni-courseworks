document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const inputElements = document.querySelectorAll('input[type="text"]');

    for (let inputElement of inputElements) {
        inputElement.addEventListener('focus', () => {
            inputElement.parentElement.classList.add('focused');
        });
    }

    for (let inputElement of inputElements) {
        inputElement.addEventListener('blur', () => {
            inputElement.parentElement.classList.remove('focused');
        });
    }
}
