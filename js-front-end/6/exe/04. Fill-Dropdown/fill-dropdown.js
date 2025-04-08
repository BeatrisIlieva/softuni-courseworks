document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const submitButton = document.querySelector('input[type=submit]');

    submitButton.addEventListener('click', e => submitHandler(e));

    function submitHandler(e) {
        e.preventDefault();

        const newItemTextElement = document.getElementById('newItemText');
        const newItemValueElement = document.getElementById('newItemValue');
        const menuElement = document.getElementById('menu');

        const newItemText = newItemTextElement.value;
        const newItemValue = newItemValueElement.value;

        const optionElement = document.createElement('option');
        optionElement.textContent = newItemText;
        optionElement.value = newItemValue;

        menuElement.append(optionElement);

        newItemTextElement.value = '';
        newItemValueElement.value = '';

        newItemTextElement.focus();
    }
}
