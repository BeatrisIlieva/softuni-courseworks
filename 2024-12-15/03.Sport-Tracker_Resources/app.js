const baseUrl = 'http://localhost:3030/jsonstore/workout';

const addButtonElement = document.getElementById('add-workout');
const editButtonElement = document.getElementById('edit-workout');
const loadButtonElement = document.getElementById('load-workout');

const listElement = document.getElementById('list');

loadButtonElement.addEventListener('click', loadHandler);
editButtonElement.addEventListener('click', editHandler);
addButtonElement.addEventListener('click', addHandler);

function loadHandler(e) {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            listElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                const containerElement = createContainer(item);
                fragment.appendChild(containerElement);
            });

            listElement.appendChild(fragment);
        });
}

function addHandler(e) {
    const inputValues = getInputValues();
    if (!isFormValid()) {
        return;
    }
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValues)
    })
        .then(() => {
            resetInputValues();
            loadHandler();
        })
        .catch(err => console.log(err.message));
}

function editHandler(e) {
    const formElement = document.querySelector('form');
    const workoutId = formElement.getAttribute('data-id');

    if (!isFormValid) {
        return;
    }

    const inputValues = getInputValues();

    const data = { ...inputValues, _id: workoutId };

    fetch(`${baseUrl}/${workoutId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(() => {
            loadHandler();
            resetInputValues();
            toggleButtons(addButtonElement, editButtonElement);
        })
        .catch(err => console.log(err.message));
}

function createContainer(data) {
    const workoutH2Element = document.createElement('h2');
    workoutH2Element.textContent = data.workout;

    const dateH3Element = document.createElement('h3');
    dateH3Element.textContent = data.date;

    const locationH3Element = document.createElement('h3');
    locationH3Element.textContent = data.location;

    const changeButtonElement = document.createElement('button');
    changeButtonElement.classList.add('change-btn');
    changeButtonElement.textContent = 'Change';
    changeButtonElement.addEventListener('click', changeHandler);

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('delete-btn');
    deleteButtonElement.textContent = 'Done';
    deleteButtonElement.addEventListener('click', deleteHandler);

    const buttonsDivElement = document.createElement('div');
    buttonsDivElement.classList.add('buttons-container');
    buttonsDivElement.appendChild(changeButtonElement);
    buttonsDivElement.appendChild(deleteButtonElement);

    const containerDivElement = document.createElement('div');
    containerDivElement.classList.add('container');
    containerDivElement.appendChild(workoutH2Element);
    containerDivElement.appendChild(dateH3Element);
    containerDivElement.appendChild(locationH3Element);
    containerDivElement.appendChild(buttonsDivElement);
    containerDivElement.setAttribute('data-id', data._id);

    return containerDivElement;
}

function changeHandler(e) {
    const buttonElement = e.currentTarget;
    const containerElement =
        buttonElement.parentElement.parentElement;

    const h2Element = containerElement.querySelector('h2');
    const workout = h2Element.textContent;

    const h3Elements = containerElement.querySelectorAll('h3');
    const date = h3Elements[0].textContent;
    const location = h3Elements[1].textContent;

    const workoutId = containerElement.getAttribute('data-id');

    const formElement = document.querySelector('form');
    formElement.setAttribute('data-id', workoutId);

    containerElement.remove();

    toggleButtons(editButtonElement, addButtonElement);

    setInputValues(workout, date, location);
}

function deleteHandler(e) {
    const buttonElement = e.currentTarget;
    const containerElement =
        buttonElement.parentElement.parentElement;
    const workoutId = containerElement.getAttribute('data-id');

    fetch(`${baseUrl}/${workoutId}`, {
        method: 'DELETE'
    })
        .then(() => loadHandler())
        .catch(err => console.log(err.message));
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}

function isFormValid() {
    const workoutInputElement = document.getElementById('workout');
    const locationInputElement = document.getElementById('location');
    const dateInoutElement = document.getElementById('date');

    const workout = workoutInputElement.value.trim();
    const location = locationInputElement.value.trim();
    const date = dateInoutElement.value.trim();

    return workout && location && date;
}

function getInputValues() {
    const workoutInputElement = document.getElementById('workout');
    const locationInputElement = document.getElementById('location');
    const dateInoutElement = document.getElementById('date');

    const workout = workoutInputElement.value;
    const location = locationInputElement.value;
    const date = dateInoutElement.value;

    return { workout, location, date };
}

function setInputValues(workout, date, location) {
    const workoutInputElement = document.getElementById('workout');
    const locationInputElement = document.getElementById('location');
    const dateInoutElement = document.getElementById('date');

    workoutInputElement.value = workout;
    locationInputElement.value = location;
    dateInoutElement.value = date;
}

function resetInputValues() {
    const workoutInputElement = document.getElementById('workout');
    const locationInputElement = document.getElementById('location');
    const dateInoutElement = document.getElementById('date');

    workoutInputElement.value = '';
    locationInputElement.value = '';
    dateInoutElement.value = '';
}
