function addItem() {
    const inputElement = document.getElementById('newItemText');
    const listElement = document.getElementById('items');

    const input = inputElement.value;

    const listItem = document.createElement('li');
    listItem.textContent = input;

    listElement.append(listItem);

    inputElement.value = '';
    inputElement.focus();
}
