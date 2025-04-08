document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const inputElements = document.querySelectorAll('input[type=text]');

    inputElements.forEach(input => {
        input.addEventListener('focus', e => {
            const parentElement = input.parentElement;
            parentElement.classList.add('focused');
        });
    });

    inputElements.forEach(input => {
        input.addEventListener('blur', e => {
            const parentElement = input.parentElement;
            parentElement.classList.remove('focused');
        });
    });
}
