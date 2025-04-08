function addItem() {
    const listElement = document.getElementById('items');
    const inputElement = document.getElementById('newItemText');

    const input = inputElement.value;

    const liElement = document.createElement('li');
    liElement.textContent = input;

    const deleteButton = document.createElement('a');
    deleteButton.href = '#';
    deleteButton.textContent = '[Delete]';

    deleteButton.addEventListener('click', e => {
        liElement.remove();
    });

    liElement.append(deleteButton);

    listElement.append(liElement);

    inputElement.value = '';
    inputElement.focus();
}
