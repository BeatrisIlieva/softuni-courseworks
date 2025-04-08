document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const formElement = document.querySelector('form');

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const newItemTextElement = e.target.querySelector('#newItemText');
        const newItemValueElement = e.target.querySelector('#newItemValue');
        const selectMenuElement = document.getElementById('menu');
        const optionElement = document.createElement('option');

        const newItemText = newItemTextElement.value;
        const newItemValue = newItemValueElement.value;

        if (newItemText === '' && newItemValue === '') {
            return;
        }

        optionElement.textContent = newItemText;
        optionElement.setAttribute('value', newItemValue);

        selectMenuElement.append(optionElement);
        e.target.querySelector('#newItemText').focus();
        e.target.reset();
    });
}
