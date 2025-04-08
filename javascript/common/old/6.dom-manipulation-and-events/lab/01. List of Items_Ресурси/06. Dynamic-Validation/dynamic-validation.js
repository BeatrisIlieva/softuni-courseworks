document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const inputElement = document.getElementById('email');

    inputElement.addEventListener('change', () => {
        const input = inputElement.value;
        
        pattern = /[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+/;

        if (!pattern.test(input)) {
            inputElement.classList.add('error');
        } else {
            inputElement.classList.remove('error');
        }
    });
}
