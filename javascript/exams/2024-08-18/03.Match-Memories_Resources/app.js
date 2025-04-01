const baseUrl = 'http://localhost:3030/jsonstore/matches';

const hostInputElement = document.getElementById('host');
const scoreInputElement = document.getElementById('score');
const guestInputElement = document.getElementById('guest');

const addButtonElement = document.getElementById('add-match');
const editButtonElement = document.getElementById('edit-match');
const loadButtonElement = document.getElementById('load-matches');

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
                fragment.appendChild(createMatchElement(item));
            });

            listElement.appendChild(fragment);
        })
        .catch(err => console.log(err.message));
}

function editHandler(e) {
    if (!isFormValid) {
        return;
    }
    const formElement = document.querySelector('form');
    const matchId = formElement.getAttribute('data-id');
    const inputValues = getInputValues();

    const data = { ...inputValues, _id: matchId };

    fetch(`${baseUrl}/${matchId}`, {
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

function addHandler(e) {
    if (!isFormValid) {
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

function createMatchElement(data) {
    const liElement = document.createElement('li');
    liElement.classList.add('match');

    const hostPElement = document.createElement('p');
    hostPElement.textContent = data.host;

    const scorePElement = document.createElement('p');
    scorePElement.textContent = data.score;

    const guestPElement = document.createElement('p');
    guestPElement.textContent = data.guest;

    const infoDivElement = document.createElement('div');
    infoDivElement.classList.add('info');
    infoDivElement.appendChild(hostPElement);
    infoDivElement.appendChild(scorePElement);
    infoDivElement.appendChild(guestPElement);

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

    const buttonsDivElement = document.createElement('div');
    buttonsDivElement.classList.add('btn-wrapper');
    buttonsDivElement.appendChild(changeButtonElement);
    buttonsDivElement.appendChild(deleteButtonElement);

    liElement.appendChild(infoDivElement);
    liElement.appendChild(buttonsDivElement);

    return liElement;
}

function changeHandler(e, data) {
    const buttonElement = e.currentTarget;
    const liElement = buttonElement.parentElement.parentElement;
    liElement.remove();

    const host = data.host;
    const score = data.score;
    const guest = data.guest;

    setInputValues(host, score, guest);

    const formElement = document.querySelector('form');

    formElement.setAttribute('data-id', data._id);

    toggleButtons(editButtonElement, addButtonElement);
}

function deleteHandler(e, data) {
    const buttonElement = e.currentTarget;

    const matchId = data._id;

    fetch(`${baseUrl}/${matchId}`, {
        method: 'DELETE'
    })
        .then(() => {
            const liElement =
                buttonElement.parentElement.parentElement;
            liElement.remove();

            loadHandler();
        })
        .catch(err => console.log(err.message));
}

function getInputValues() {
    const host = document.getElementById('host').value;
    const score = document.getElementById('score').value;
    const guest = document.getElementById('guest').value;

    return { host, score, guest };
}

function setInputValues(host, score, guest) {
    document.getElementById('host').value = host;
    document.getElementById('score').value = score;
    document.getElementById('guest').value = guest;
}

function clearInputValues() {
    document.getElementById('host').value = '';
    document.getElementById('score').value = '';
    document.getElementById('guest').value = '';
}

function isFormValid() {
    const host = document.getElementById('host').value.trim();
    const score = document.getElementById('score').value.trim();
    const guest = document.getElementById('guest').value.trim();

    return host && score && guest;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
