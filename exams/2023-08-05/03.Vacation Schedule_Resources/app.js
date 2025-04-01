const baseUrl = 'http://localhost:3030/jsonstore/tasks';

const formElement = document.querySelector('form');

const loadVacationsButtonElement = document.getElementById('load-vacations');
const addVacationButtonElement = document.getElementById('add-vacation');
const editVacationButtonElement = document.getElementById('edit-vacation');

const listDivElement = document.getElementById('list');

loadVacationsButtonElement.addEventListener('click', loadHandler);
addVacationButtonElement.addEventListener('click', addHandler);
editVacationButtonElement.addEventListener('click', editHandler);

function loadHandler() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            listDivElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                const containerDivElement = createContainerDivElement(item);
                fragment.appendChild(containerDivElement);
            });

            listDivElement.appendChild(fragment);
        })
        .catch(err => console.log(err.message));
}

function addHandler(e) {
    e.preventDefault();

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

function editHandler(e) {
    e.preventDefault();

    if (!isFormValid()) {
        return;
    }

    const inputValues = getInputValues();
    const itemId = formElement.getAttribute('data-id');
    const data = { ...inputValues, _id: itemId };

    fetch(`${baseUrl}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => {
            clearInputValues();
            toggleButtons(addVacationButtonElement, editVacationButtonElement);
            loadHandler();
        })
        .catch(err => console.log(err.message));
}

function createContainerDivElement(data) {
    const nameH2Element = document.createElement('h2');
    nameH2Element.textContent = data.name;

    const dateH3Element = document.createElement('h3');
    dateH3Element.textContent = data.date;

    const daysH3Element = document.createElement('h3');
    daysH3Element.textContent = data.days;

    const changeButtonElement = document.createElement('button');
    changeButtonElement.classList.add('change-btn');
    changeButtonElement.textContent = 'Change';
    changeButtonElement.addEventListener('click', e => changeHandler(e, data));

    const doneButtonElement = document.createElement('button');
    doneButtonElement.classList.add('done-btn');
    doneButtonElement.textContent = 'Done';
    doneButtonElement.addEventListener('click', e => doneHandler(e, data));

    const containerDivElement = document.createElement('div');
    containerDivElement.classList.add('container');
    containerDivElement.appendChild(nameH2Element);
    containerDivElement.appendChild(dateH3Element);
    containerDivElement.appendChild(daysH3Element);
    containerDivElement.appendChild(changeButtonElement);
    containerDivElement.appendChild(doneButtonElement);

    return containerDivElement;
}

function changeHandler(e, data) {
    const itemId = data._id;
    formElement.setAttribute('data-id', itemId);
    setInputValues(data);

    const containerDivElement = e.currentTarget.parentElement;
    containerDivElement.remove();

    toggleButtons(editVacationButtonElement, addVacationButtonElement);
}

function doneHandler(e, data) {
    const itemId = data._id;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    })
        .then(() => loadHandler())
        .catch(err => console.log(err.message));
}

function clearInputValues() {
    document.getElementById('name').value = '';
    document.getElementById('num-days').value = '';
    document.getElementById('from-date').value = '';
}

function setInputValues(data) {
    document.getElementById('name').value = data.name;
    document.getElementById('num-days').value = data.days;
    document.getElementById('from-date').value = data.date;
}

function getInputValues() {
    const name = document.getElementById('name').value.trim();
    const days = document.getElementById('num-days').value.trim();
    const date = document.getElementById('from-date').value.trim();

    return { name, days, date };
}

function isFormValid() {
    const name = document.getElementById('name').value.trim();
    const days = document.getElementById('num-days').value.trim();
    const date = document.getElementById('from-date').value.trim();
    return name && days && date;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
