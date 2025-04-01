const baseUrl = 'http://localhost:3030/jsonstore/appointments';

const loadButtonElement = document.getElementById(
    'load-appointments'
);
const addButtonElement = document.getElementById('add-appointment');
const editButtonElement = document.getElementById('edit-appointment');

loadButtonElement.addEventListener('click', loadHandler);
addButtonElement.addEventListener('click', addHandler);
editButtonElement.addEventListener('click', editHandler);

function loadHandler(e) {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            const appointmentsListElement = document.getElementById(
                'appointments-list'
            );

            appointmentsListElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                fragment.appendChild(createAppointment(item));
            });

            appointmentsListElement.appendChild(fragment);
        })
        .catch(err => console.log(err.message));
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
            loadHandler();
            resetInputValues();
        })
        .catch(err => console.log(err.message));
}

function editHandler(e) {
    const formElement = document.querySelector('form');
    const appointmentId = formElement.getAttribute('data-id');

    const inputValues = getInputValues();

    const data = { ...inputValues, _id: appointmentId };

    fetch(`${baseUrl}/${appointmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(() => {
            toggleButtons(addButtonElement, editButtonElement);
            loadHandler();
            resetInputValues();
        })
        .catch(err => console.log(err.message));
}

function createAppointment(data) {
    const modelH2Element = document.createElement('h2');
    modelH2Element.textContent = data.model;

    const dateH3Element = document.createElement('h3');
    dateH3Element.textContent = data.date;

    const serviceH3Element = document.createElement('h3');
    serviceH3Element.textContent = data.service;

    const changeButtonElement = document.createElement('button');
    changeButtonElement.classList.add('change-btn');
    changeButtonElement.textContent = 'Change';
    changeButtonElement.addEventListener('click', changeHandler);

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('delete-btn');
    deleteButtonElement.textContent = 'Delete';
    deleteButtonElement.addEventListener('click', deleteHandler);

    const buttonsElement = document.createElement('div');
    buttonsElement.classList.add('buttons-appointment');
    buttonsElement.appendChild(changeButtonElement);
    buttonsElement.appendChild(deleteButtonElement);

    const liElement = document.createElement('li');
    liElement.classList.add('appointment');
    liElement.setAttribute('data-id', data._id);
    liElement.appendChild(modelH2Element);
    liElement.appendChild(dateH3Element);
    liElement.appendChild(serviceH3Element);
    liElement.appendChild(buttonsElement);

    return liElement;
}

function changeHandler(e) {
    const buttonElement = e.currentTarget;
    const appointmentElement =
        buttonElement.parentElement.parentElement;
    const appointmentId = appointmentElement.getAttribute('data-id');

    const formElement = document.querySelector('form');
    formElement.setAttribute('data-id', appointmentId);

    const modelH2Element = appointmentElement.querySelector('h2');
    const h3Elements = appointmentElement.querySelectorAll('h3');

    const model = modelH2Element.textContent;
    const service = h3Elements[1].textContent;
    const date = h3Elements[0].textContent;

    setInputValues(model, service, date);

    appointmentElement.remove();
    toggleButtons(editButtonElement, addButtonElement);
}

function deleteHandler(e) {
    const buttonElement = e.currentTarget;
    const appointmentElement =
        buttonElement.parentElement.parentElement;
    const appointmentId = appointmentElement.getAttribute('data-id');

    fetch(`${baseUrl}/${appointmentId}`, {
        method: 'DELETE'
    })
        .then(() => loadHandler())
        .catch(err => console.log(err.message));
}

function getInputValues() {
    const carModelInputElement = document.getElementById('car-model');
    const carServiceSelectElement =
        document.getElementById('car-service');
    const dateInputElement = document.getElementById('date');

    const model = carModelInputElement.value;
    const service = carServiceSelectElement.value;
    const date = dateInputElement.value;

    return { model, service, date };
}

function setInputValues(model, service, date) {
    const carModelInputElement = document.getElementById('car-model');
    const carServiceSelectElement =
        document.getElementById('car-service');
    const dateInputElement = document.getElementById('date');

    carModelInputElement.value = model;
    carServiceSelectElement.value = service;
    dateInputElement.value = date;
}

function resetInputValues() {
    const carModelInputElement = document.getElementById('car-model');
    const carServiceSelectElement =
        document.getElementById('car-service');
    const dateInputElement = document.getElementById('date');

    carModelInputElement.value = '';
    carServiceSelectElement.value = '';
    dateInputElement.value = '';
}

function isFormValid() {
    const carModelInputElement = document.getElementById('car-model');
    const carServiceSelectElement =
        document.getElementById('car-service');
    const dateInputElement = document.getElementById('date');

    const model = carModelInputElement.value.trim();
    const service = carServiceSelectElement.value.trim();
    const date = dateInputElement.value.trim();

    return model && service && date;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
