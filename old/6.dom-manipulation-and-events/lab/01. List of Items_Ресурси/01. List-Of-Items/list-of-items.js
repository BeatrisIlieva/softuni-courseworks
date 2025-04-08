function addItem() {
    const listElement = document.getElementById('items');
    const inputElement = document.getElementById('newItemText');

    const value = inputElement.value;

    const listItem = document.createElement('li');
    listItem.textContent = value;

    listElement.appendChild(listItem);

    // Create new item

    // Add text Content

    // Append the new element to DOM

    // Clear input element
    inputElement.value = '';
}
