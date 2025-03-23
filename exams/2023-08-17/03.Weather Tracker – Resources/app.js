const baseUrl = 'http://localhost:3030/jsonstore/tasks';

const formElement = document.querySelector('form');

const locationInputElement = document.getElementById('location');
const temperatureInputElement =
    document.getElementById('temperature');
const dateInputElement = document.getElementById('date');

const loadButtonElement = document.getElementById('load-history');
const addButtonElement = document.getElementById('add-weather');
const editButtonElement = document.getElementById('edit-weather');

const listElement = document.getElementById('list');

loadButtonElement.addEventListener('click', loadHandler);
addButtonElement.addEventListener('click', addHandler);
editButtonElement.addEventListener('click', editHandler);

function loadHandler() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            listElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                const container = createContainer(item);
                fragment.appendChild(container);
            });

            listElement.appendChild(fragment);
        });
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
            clearInputValues();
        })
        .catch(err => console.log(err.message));
}

function editHandler() {
    if (!isFormValid()) {
        return;
    }

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
            clearInputValues();
            toggleButtons(addButtonElement, editButtonElement);
        })
        .catch(err => console.log(err.message));
}

function createContainer(data) {
    const locationH2Element = document.createElement('h2');
    locationH2Element.textContent = data.location;

    const dateH3Element = document.createElement('h3');
    dateH3Element.textContent = data.date;

    const temperatureH3Element = document.createElement('h3');
    temperatureH3Element.setAttribute('id', 'celsius');
    temperatureH3Element.textContent = data.temperature;

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

    const containerDivElement = document.createElement('div');
    containerDivElement.classList.add('container');
    containerDivElement.appendChild(locationH2Element);
    containerDivElement.appendChild(dateH3Element);
    containerDivElement.appendChild(temperatureH3Element);
    containerDivElement.appendChild(buttonsContainerDivElement);

    return containerDivElement;
}

function deleteHandler(e, data) {
    const itemId = data._id;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    }).then(() => {
        loadHandler();
    });
}

function changeHandler(e, data) {
    const itemId = data._id;
    formElement.setAttribute('data-id', itemId);
    setInputValues(data);

    const containerElement =
        e.currentTarget.parentElement.parentElement;
    containerElement.remove();

    toggleButtons(editButtonElement, addButtonElement);
}

function isFormValid() {
    const location = document.getElementById('location').value.trim();
    const temperature = document
        .getElementById('temperature')
        .value.trim();
    const date = document.getElementById('date').value.trim();

    return location && temperature && date;
}

function getInputValues() {
    const location = document.getElementById('location').value;
    const temperature = document.getElementById('temperature').value;
    const date = document.getElementById('date').value;

    return { location, temperature, date };
}

function setInputValues(data) {
    document.getElementById('location').value = data.location;
    document.getElementById('temperature').value = data.temperature;
    document.getElementById('date').value = data.date;
}

function clearInputValues() {
    document.getElementById('location').value = '';
    document.getElementById('temperature').value = '';
    document.getElementById('date').value = '';
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
