const baseUrl = 'http://localhost:3030/jsonstore/tasks';

const formElement = document.querySelector('form');

const foodInputElement = document.getElementById('food');
const timeInputElement = document.getElementById('time');
const caloriesInputElement = document.getElementById('calories');

const loadButtonElement = document.getElementById('load-meals');
const addButtonElement = document.getElementById('add-meal');
const editMealButtonElement = document.getElementById('edit-meal');

const listElement = document.getElementById('list');

loadButtonElement.addEventListener('click', loadHandler);
addButtonElement.addEventListener('click', addHandler);
editMealButtonElement.addEventListener('click', editHandler);

function loadHandler() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            listElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                fragment.appendChild(createMealDivElement(item));
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
    }).then(() => {
        clearInputValues();
        loadHandler();
    });
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
            toggleButtons(addButtonElement, editMealButtonElement);
            clearInputValues();
        })
        .catch(err => console.log(err.message));
}

function createMealDivElement(data) {
    const foodH2Element = document.createElement('h2');
    foodH2Element.textContent = data.food;

    const timeH3Element = document.createElement('h3');
    timeH3Element.textContent = data.time;

    const caloriesH3Element = document.createElement('h3');
    caloriesH3Element.textContent = data.calories;

    const changeButtonElement = document.createElement('button');
    changeButtonElement.classList.add('change-meal');
    changeButtonElement.textContent = 'Change';
    changeButtonElement.addEventListener('click', e =>
        changeHandler(e, data)
    );

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('delete-meal');
    deleteButtonElement.textContent = 'Delete';
    deleteButtonElement.addEventListener('click', e =>
        deleteHandler(e, data)
    );

    const mealButtonsDivElement = document.createElement('div');
    mealButtonsDivElement.classList.add('meal-buttons');
    mealButtonsDivElement.appendChild(changeButtonElement);
    mealButtonsDivElement.appendChild(deleteButtonElement);

    const mealDivElement = document.createElement('div');
    mealDivElement.classList.add('meal');
    mealDivElement.appendChild(foodH2Element);
    mealDivElement.appendChild(timeH3Element);
    mealDivElement.appendChild(caloriesH3Element);
    mealDivElement.appendChild(mealButtonsDivElement);

    return mealDivElement;
}

function changeHandler(e, data) {
    const itemId = data._id;
    formElement.setAttribute('data-id', itemId);

    toggleButtons(editMealButtonElement, addButtonElement);

    setInoutValues(data);

    e.currentTarget.parentElement.parentElement.remove();
}

function deleteHandler(e, data) {
    const itemId = data._id;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    })
        .then(() => loadHandler())
        .catch(err => console.log(err.message));
}

function isFormValid() {
    const food = document.getElementById('food').value.trim();
    const time = document.getElementById('time').value.trim();
    const calories = document.getElementById('calories').value.trim();

    return food && time && calories;
}

function getInputValues() {
    const food = document.getElementById('food').value;
    const time = document.getElementById('time').value;
    const calories = document.getElementById('calories').value;

    return { food, time, calories };
}

function clearInputValues() {
    document.getElementById('food').value = '';
    document.getElementById('time').value = '';
    document.getElementById('calories').value = '';
}

function setInoutValues(data) {
    document.getElementById('food').value = data.food;
    document.getElementById('time').value = data.time;
    document.getElementById('calories').value = data.calories;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
