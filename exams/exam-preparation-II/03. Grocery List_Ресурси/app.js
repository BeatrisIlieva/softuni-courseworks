const baseUrl = 'http://localhost:3030/jsonstore/grocery';

const addProductButtonElement = document.getElementById('add-product');
const updateProductButtonElement = document.getElementById('update-product');
const loadProductButtonElement = document.getElementById('load-product');

const formElement = document.querySelector('form');

const tbodyElement = document.getElementById('tbody');

loadProductButtonElement.addEventListener('click', loadHandler);
addProductButtonElement.addEventListener('click', e => addHandler(e));
updateProductButtonElement.addEventListener('click', updateProductHandler);
formElement.addEventListener('submit', e => e.preventDefault());

function loadHandler(e) {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            tbodyElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                const trElement = createTrElement(item);
                fragment.appendChild(trElement);
            });

            tbodyElement.appendChild(fragment);
        });
}

function addHandler(e) {
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
            clearInputValues();
            loadHandler();
        })
        .catch(err => console.log(err.message));
}

function updateProductHandler(e) {
    if (!isFormValid()) {
        return;
    }

    const inputValues = getInputValues();
    const itemId = formElement.getAttribute('data-id');

    fetch(`${baseUrl}/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValues)
    }).then(() => {
        clearInputValues();
        loadHandler();
        toggleButtons(addProductButtonElement, updateProductButtonElement);
    });
}

function createTrElement(data) {
    const nameTdElement = document.createElement('td');
    nameTdElement.classList.add('name');
    nameTdElement.textContent = data.product;

    const countTdElement = document.createElement('td');
    countTdElement.classList.add('count-product');
    countTdElement.textContent = data.count;

    const priceTdElement = document.createElement('td');
    priceTdElement.classList.add('product-price');
    priceTdElement.textContent = data.price;

    const updateButtonElement = document.createElement('button');
    updateButtonElement.classList.add('update');
    updateButtonElement.textContent = 'Update';
    updateButtonElement.addEventListener('click', e => updateHandler(e, data));

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('delete');
    deleteButtonElement.textContent = 'Delete';
    deleteButtonElement.addEventListener('click', e => deleteHandler(e, data));

    const buttonsTdElement = document.createElement('td');
    buttonsTdElement.classList.add('btn');
    buttonsTdElement.appendChild(updateButtonElement);
    buttonsTdElement.appendChild(deleteButtonElement);

    const trElement = document.createElement('tr');
    trElement.appendChild(nameTdElement);
    trElement.appendChild(countTdElement);
    trElement.appendChild(priceTdElement);
    trElement.appendChild(buttonsTdElement);

    return trElement;
}

function updateHandler(e, data) {
    setInputValues(data);
    toggleButtons(updateProductButtonElement, addProductButtonElement);

    formElement.setAttribute('data-id', data._id);
}

function deleteHandler(e, data) {
    const itemId = data._id;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    })
        .then(loadHandler)
        .catch(err => console.log(err.message));
}

function getInputValues() {
    const product = document.getElementById('product').value;
    const count = document.getElementById('count').value;
    const price = document.getElementById('price').value;

    return { product, count, price };
}

function setInputValues(data) {
    document.getElementById('product').value = data.product;
    document.getElementById('count').value = data.count;
    document.getElementById('price').value = data.price;
}

function clearInputValues() {
    document.getElementById('product').value = '';
    document.getElementById('count').value = '';
    document.getElementById('price').value = '';
}

function isFormValid() {
    const product = document.getElementById('product').value.trim();
    const count = document.getElementById('count').value.trim();
    const price = document.getElementById('price').value.trim();

    return product && count && price;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
