function addItem() {
    const selectMenuElement = document.getElementById('menu');

    const newItemTextElement = document.getElementById('newItemText');
    const newItemText = newItemTextElement.value;

    const newItemValueElement = document.getElementById('newItemValue');
    const newItemValue = newItemValueElement.value;

    const optionElement = document.createElement('option');
    optionElement.textContent = newItemText;
    optionElement.value = newItemValue;

    selectMenuElement.append(optionElement);

    newItemTextElement.value = '';
    newItemValueElement.value = '';
}
