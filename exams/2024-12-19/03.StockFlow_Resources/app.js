const baseUrl = 'http://localhost:3030/jsonstore/orders';

const nameInputElement = document.getElementById('name');
const quantityInputElement = document.getElementById('quantity');
const dateInputElement = document.getElementById('date');

const loadButtonElement = document.getElementById('load-orders');
const orderButtonElement = document.getElementById('order-btn');
const editButtonElement = document.getElementById('edit-order');

const listElement = document.getElementById('list');

loadButtonElement.addEventListener('click', loadHandler);
orderButtonElement.addEventListener('click', orderHandler);
editButtonElement.addEventListener('click', editHandler);

function loadHandler(e) {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            listElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item =>
                fragment.appendChild(createOrder(item))
            );

            listElement.appendChild(fragment);
        })
        .catch(err => console.log(err.message));
}

function orderHandler(e) {
    e.preventDefault();

    const name = nameInputElement.value;
    const quantity = quantityInputElement.value;
    const date = dateInputElement.value;

    if (
        name.trim() == '' ||
        quantity.trim() == '' ||
        date.trim() == ''
    ) {
        return;
    }

    const product = {
        name,
        quantity,
        date
    };

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        // .then(response => response.json())
        .then(result => {
            loadHandler();
            clearInput();
        })
        .catch(err => console.log(err.message));
}

function createOrder(data) {
    const nameH2Element = document.createElement('h2');
    nameH2Element.textContent = data.name;

    const dateH3Element = document.createElement('h3');
    dateH3Element.textContent = data.date;

    const quantityH3Element = document.createElement('h3');
    quantityH3Element.textContent = data.quantity;

    const changeButtonElement = document.createElement('button');
    changeButtonElement.classList.add('change-btn');
    changeButtonElement.textContent = 'Change';
    changeButtonElement.addEventListener('click', changeHandler);

    const doneButtonElement = document.createElement('button');
    doneButtonElement.classList.add('done-btn');
    doneButtonElement.textContent = 'Done';
    doneButtonElement.addEventListener('click', doneHandler);

    const containerDivElement = document.createElement('div');
    containerDivElement.classList.add('container');
    containerDivElement.setAttribute('data-id', data._id);

    containerDivElement.appendChild(nameH2Element);
    containerDivElement.appendChild(dateH3Element);
    containerDivElement.appendChild(quantityH3Element);
    containerDivElement.appendChild(changeButtonElement);
    containerDivElement.appendChild(doneButtonElement);

    return containerDivElement;
}

function doneHandler(e) {
    const buttonElement = e.currentTarget;
    const containerDivElement = buttonElement.parentElement;
    const itemId = containerDivElement.getAttribute('data-id');

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    })
        // .then(response => response.json())
        .then(result => containerDivElement.remove())
        .catch(err => console.log(err.message));
}

function changeHandler(e) {
    if (
        nameInputElement.value.trim() !== '' ||
        quantityInputElement.value.trim() !== '' ||
        dateInputElement.value.trim() !== ''
    ) {
        return;
    }

    toggleButtons(editButtonElement, orderButtonElement);
    const buttonElement = e.currentTarget;
    const containerDivElement = buttonElement.parentElement;
    const itemId = containerDivElement.getAttribute('data-id');

    const name = containerDivElement.querySelector('h2').textContent;
    const h3Elements = containerDivElement.querySelectorAll('h3');
    const date = h3Elements[0].textContent;
    const quantity = h3Elements[1].textContent;

    nameInputElement.value = name;
    quantityInputElement.value = quantity;
    dateInputElement.value = date;

    containerDivElement.remove();

    const formElement = document.querySelector('form');

    formElement.setAttribute('data-id', itemId);
}

function editHandler(e) {
    const itemId = document
        .querySelector('form')
        .getAttribute('data-id');

    e.preventDefault();

    const name = nameInputElement.value;
    const quantity = quantityInputElement.value;
    const date = dateInputElement.value;

    if (
        name.trim() == '' ||
        quantity.trim() == '' ||
        date.trim() == ''
    ) {
        return;
    }

    const product = {
        name,
        quantity,
        date,
        _id: itemId
    };

    fetch(`${baseUrl}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        // .then(response => response.json())
        .then(result => {
            loadHandler();
            clearInput();
            toggleButtons(orderButtonElement, editButtonElement);
        })
        .catch(err => console.log(err.message));
}

function clearInput() {
    nameInputElement.value = '';
    quantityInputElement.value = '';
    dateInputElement.value = '';
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
