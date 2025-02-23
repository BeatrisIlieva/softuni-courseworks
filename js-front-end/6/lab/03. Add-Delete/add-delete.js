function addItem() {
    const inputElement = document.getElementById('newItemText');
    const listElement = document.getElementById('items');

    const input = inputElement.value;

    const itemElement = document.createElement('li');
    itemElement.textContent = input;

    const linkElement = document.createElement('a');
    linkElement.href = '#';
    linkElement.textContent = '[Delete]'

    linkElement.addEventListener('click', e => itemElement.remove())

    itemElement.append(linkElement);

    listElement.append(itemElement);

    inputElement.value = '';
    inputElement.focus();
}
