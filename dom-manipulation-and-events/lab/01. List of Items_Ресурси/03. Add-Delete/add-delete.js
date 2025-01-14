function addItem() {
    const listElement = document.getElementById('items');
    const inputElement = document.getElementById('newItemText');

    const input = inputElement.value;

    const listItem = document.createElement('li');
    listItem.textContent = input;
    listElement.appendChild(listItem);

    const deleteButtonElement = document.createElement('a');
    deleteButtonElement.href = '#';
    deleteButtonElement.textContent = '[Delete]';

    deleteButtonElement.addEventListener('click', () => {
        listItem.remove();
    });

    listItem.appendChild(deleteButtonElement);

    inputElement.textContent = '';
}
