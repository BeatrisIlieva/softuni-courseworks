function addItem() {
    const inputElement = document.getElementById('newItemText');
    const listElement = document.getElementById('items');

    const input = inputElement.value;

    const liElement = document.createElement('li');
    liElement.textContent = input;

    listElement.append(liElement);

    inputElement.value = '';
    inputElement.focus();
}
