const baseUrl = 'http://localhost:3030/jsonstore/records';

const loadButtonElement = document.getElementById('load-records');
const addButtonElement = document.getElementById('add-record');
const editButtonElement = document.getElementById('edit-record');

const listElement = document.getElementById('list');

const formElement = document.querySelector('form');

const nameInputElement = document.getElementById('p-name');
const stepsInputElement = document.getElementById('steps');
const caloriesInputElement = document.getElementById('calories');

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
                const liElement = createRecord(item);
                fragment.appendChild(liElement);
            });

            listElement.appendChild(fragment);
        })
        .catch(err => console.log(err.message));
}

function addHandler() {
    if (!isFormValid) {
        return;
    }

    const inputValues = getInputValues();
    const formDataId = getFormDataId();

    const data = { ...inputValues, _id: formDataId };

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => {
            clearInputValues();
            loadHandler();
        })
        .catch(err => console.log(err.message));
}

function editHandler() {
    if (!isFormValid) {
        return;
    }

    const inputValues = getInputValues();

    const formDataId = getFormDataId();

    const data = { ...inputValues, _id: formDataId };

    fetch(`${baseUrl}/${formDataId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => {
            clearInputValues();
            toggleButtons(addButtonElement, editButtonElement);
            loadHandler();
        })
        .catch(err => console.log(err.message));
}

function createRecord(data) {
    const namePElement = document.createElement('p');
    namePElement.textContent = data.name;

    const stepsPElement = document.createElement('p');
    stepsPElement.textContent = data.steps;

    const caloriesPElement = document.createElement('p');
    caloriesPElement.textContent = data.calories;

    const infoDivElement = document.createElement('div');
    infoDivElement.classList.add('info');

    infoDivElement.appendChild(namePElement);
    infoDivElement.appendChild(stepsPElement);
    infoDivElement.appendChild(caloriesPElement);

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

    const buttonsWrapperDivElement = document.createElement('div');
    buttonsWrapperDivElement.classList.add('btn-wrapper');
    buttonsWrapperDivElement.appendChild(changeButtonElement);
    buttonsWrapperDivElement.appendChild(deleteButtonElement);

    const liElement = document.createElement('li');
    liElement.classList.add('record');
    liElement.appendChild(infoDivElement);
    liElement.appendChild(buttonsWrapperDivElement);

    return liElement;
}

function deleteHandler(e, data) {
    const itemId = data._id;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    }).then(() => loadHandler());
}

function changeHandler(e, data) {
    const itemId = data._id;

    setInputValues(data);
    setFormDataId(itemId);
    toggleButtons(editButtonElement, addButtonElement);

    const liElement = e.currentTarget.parentElement.parentElement;
    liElement.remove();
}

function getInputValues() {
    const name = document.getElementById('p-name').value;
    const steps = document.getElementById('steps').value;
    const calories = document.getElementById('calories').value;

    return { name, steps, calories };
}

function setInputValues(data) {
    document.getElementById('p-name').value = data.name;
    document.getElementById('steps').value = data.steps;
    document.getElementById('calories').value = data.calories;
}

function clearInputValues() {
    document.getElementById('p-name').value = '';
    document.getElementById('steps').value = '';
    document.getElementById('calories').value = '';
}

function isFormValid() {
    const name = document.getElementById('p-name').value.trim();
    const steps = document.getElementById('steps').value.trim();
    const calories = document.getElementById('calories').value.trim();

    return name && steps && calories;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}

function setFormDataId(itemId) {
    const formElement = document.querySelector('form');
    formElement.setAttribute('data-id', itemId);
}

function getFormDataId(e) {
    const formElement = document.querySelector('form');
    const formDataId = formElement.getAttribute('data-id');

    return formDataId;
}
