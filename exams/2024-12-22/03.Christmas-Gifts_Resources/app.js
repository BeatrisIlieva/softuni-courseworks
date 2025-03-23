const baseUrl = 'http://localhost:3030/jsonstore/gifts';

const formElement = document.querySelector('form');

const giftInputElement = document.getElementById('gift');
const forInputElement = document.getElementById('for');
const priceInputElement = document.getElementById('price');

const loadButtonElement = document.getElementById('load-presents');
const addPresentButtonElement =
    document.getElementById('add-present');
const editPresentButtonElement =
    document.getElementById('edit-present');

editPresentButtonElement.addEventListener('click', editHandler);
addPresentButtonElement.addEventListener('click', addHandler);

const giftListElement = document.getElementById('gift-list');

loadButtonElement.addEventListener('click', loadHandler);

function loadHandler() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            giftListElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                const giftSockDivElement =
                    createGiftSockDivElement(item);

                fragment.appendChild(giftSockDivElement);
            });

            giftListElement.appendChild(fragment);
        })
        .catch(err => console.log(err.message));
}

function addHandler() {
    if (!isFormValid()) {
        return;
    }

    const inputValues = getInputValues();

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValues)
    })
        .then(() => {
            loadHandler();
            clearInput();
        })
        .catch(err => console.log(err.message));
}

function editHandler() {
    if (!isFormValid()) {
        return;
    }

    const formElement = document.querySelector('form');
    const itemId = formElement.getAttribute('data-id');

    const inputValues = getInputValues();
    const data = { ...inputValues, _id: itemId };

    fetch(`${baseUrl}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => {
            loadHandler();
            clearInput();
            toggleButtons(
                addPresentButtonElement,
                editPresentButtonElement
            );
        })
        .catch(err => console.log(err.message));
}

function createGiftSockDivElement(data) {
    const giftPElement = document.createElement('p');
    giftPElement.textContent = data.gift;

    const forPElement = document.createElement('p');
    forPElement.textContent = data.for;

    const pricePElement = document.createElement('p');
    pricePElement.textContent = data.price;

    const contentDivElement = document.createElement('div');
    contentDivElement.classList.add('content');
    contentDivElement.appendChild(giftPElement);
    contentDivElement.appendChild(forPElement);
    contentDivElement.appendChild(pricePElement);

    const changeButtonElement = document.createElement('button');
    changeButtonElement.classList.add('change-btn');
    changeButtonElement.textContent = 'Change';
    changeButtonElement.addEventListener('click', e =>
        changeHandler(e, data)
    );

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('delete-btn');
    deleteButtonElement.textContent = 'Delete';
    deleteButtonElement.addEventListener('click', e =>
        deleteHandler(e, data)
    );

    const buttonsContainerDivElement = document.createElement('div');
    buttonsContainerDivElement.classList.add('buttons-container');
    buttonsContainerDivElement.appendChild(changeButtonElement);
    buttonsContainerDivElement.appendChild(deleteButtonElement);

    const giftSockDivElement = document.createElement('div');
    giftSockDivElement.classList.add('gift-sock');
    giftSockDivElement.appendChild(contentDivElement);
    giftSockDivElement.appendChild(buttonsContainerDivElement);

    return giftSockDivElement;
}

function changeHandler(e, data) {
    const formElement = document.querySelector('form');
    formElement.setAttribute('data-id', data._id);

    const giftSockDivElement =
        e.currentTarget.parentElement.parentElement;
    giftSockDivElement.remove();

    setInputValues(data);
    toggleButtons(editPresentButtonElement, addPresentButtonElement);
}

function deleteHandler(e, data) {
    const itemId = data._id;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    }).then(() => {
        loadHandler();
    });
}

function isFormValid() {
    const gift = document.getElementById('gift').value.trim();
    const giftFor = document.getElementById('for').value.trim();
    const price = document.getElementById('price').value.trim();

    return gift && giftFor && price;
}

function clearInput() {
    document.getElementById('gift').value = '';
    document.getElementById('for').value = '';
    document.getElementById('price').value = '';
}

function getInputValues() {
    const gift = document.getElementById('gift').value;
    const giftFor = document.getElementById('for').value;
    const price = document.getElementById('price').value;

    return { gift, for: giftFor, price };
}

function setInputValues(data) {
    document.getElementById('gift').value = data.gift;
    document.getElementById('for').value = data.for;
    document.getElementById('price').value = data.price;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
