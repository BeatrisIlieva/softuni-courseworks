const baseUrl = 'http://localhost:3030/jsonstore/games';

const formElement = document.querySelector('form');

const nameInputElement = document.getElementById('g-name');
const typeInputElement = document.getElementById('type');
const playersInputElement = document.getElementById('players');

const addButtonElement = document.getElementById('add-game');
const editButtonElement = document.getElementById('edit-game');
const loadButtonElement = document.getElementById('load-games');

const gamesListElement = document.getElementById('games-list');

loadButtonElement.addEventListener('click', loadHandler);
addButtonElement.addEventListener('click', addHandler);
editButtonElement.addEventListener('click', editHandler);

function loadHandler() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            gamesListElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                const boardGameElement = createBoardGameElement(item);
                fragment.appendChild(boardGameElement);
            });

            gamesListElement.appendChild(fragment);
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
            clearInputValues();
            loadHandler();
        })
        .catch(err => console.log(err.message));
}

function editHandler(e) {
    if (!isFormValid) {
        return;
    }

    const inputValues = getInputValues();

    const formElement = document.querySelector('form');
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
            toggleButtons(addButtonElement, editButtonElement);
            clearInputValues();
            loadHandler();
        })
        .catch(err => console.log(err.message));
}

function createBoardGameElement(data) {
    const namePElement = document.createElement('p');
    namePElement.textContent = data.name;

    const typePElement = document.createElement('p');
    typePElement.textContent = data.type;

    const playersPElement = document.createElement('p');
    playersPElement.textContent = data.players;

    const contentDivElement = document.createElement('div');
    contentDivElement.classList.add('content');
    contentDivElement.appendChild(namePElement);
    contentDivElement.appendChild(typePElement);
    contentDivElement.appendChild(playersPElement);

    const changeButtonElement = document.createElement('button');
    changeButtonElement.textContent = 'Change';
    changeButtonElement.classList.add('change-btn');
    changeButtonElement.addEventListener('click', e =>
        changeHandler(e, data)
    );

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.textContent = 'Delete';
    deleteButtonElement.classList.add('delete-btn');
    deleteButtonElement.addEventListener('click', e =>
        deleteHandler(e, data)
    );

    const buttonsContainerDivElement = document.createElement('div');
    buttonsContainerDivElement.classList.add('buttons-container');
    buttonsContainerDivElement.appendChild(changeButtonElement);
    buttonsContainerDivElement.appendChild(deleteButtonElement);

    const boardGameDivElement = document.createElement('div');
    boardGameDivElement.classList.add('board-game');
    boardGameDivElement.appendChild(contentDivElement);
    boardGameDivElement.appendChild(buttonsContainerDivElement);

    return boardGameDivElement;
}

function changeHandler(e, data) {
    const formElement = document.querySelector('form');
    formElement.setAttribute('data-id', data._id);

    setInputValues(data);
    toggleButtons(editButtonElement, addButtonElement);
}

function deleteHandler(e, data) {
    const itemId = data._id;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    })
        .then(() => loadHandler())
        .catch(err => console.log(err.message));
}

function getInputValues() {
    const name = document.getElementById('g-name').value;
    const type = document.getElementById('type').value;
    const players = document.getElementById('players').value;

    return { name, type, players };
}

function setInputValues(data) {
    document.getElementById('g-name').value = data.name;
    document.getElementById('type').value = data.type;
    document.getElementById('players').value = data.players;
}

function clearInputValues() {
    document.getElementById('g-name').value = '';
    document.getElementById('type').value = '';
    document.getElementById('players').value = '';
}

function isFormValid() {
    const name = document.getElementById('g-name').value.trim();
    const type = document.getElementById('type').value.trim();
    const players = document.getElementById('players').value.trim();

    return name && type && players;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
