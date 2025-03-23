window.addEventListener('load', solve);

function solve() {
    const addButtonElement = document.getElementById('add-btn');

    const taskListElement = document.getElementById('task-list');
    const doneListElement = document.getElementById('done-list');

    addButtonElement.addEventListener('click', addHandler);

    function addHandler() {
        if (!isFormValid()) {
            return;
        }

        const inputValues = getInputValues();
        clearInputValues();

        const liElement = createCleanTaskLiElement(inputValues);
        taskListElement.appendChild(liElement);
    }

    function createCleanTaskLiElement(data) {
        const placePElement = document.createElement('p');
        placePElement.textContent = `Place:${data.place}`;

        const actionPElement = document.createElement('p');
        actionPElement.textContent = `Action:${data.action}`;

        const personPElement = document.createElement('p');
        personPElement.textContent = `Person:${data.person}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(placePElement);
        articleElement.appendChild(actionPElement);
        articleElement.appendChild(personPElement);

        const editButtonElement = document.createElement('button');
        editButtonElement.textContent = 'Edit';
        editButtonElement.classList.add('edit');
        editButtonElement.addEventListener('click', e =>
            editHandler(e, data)
        );

        const doneButtonElement = document.createElement('button');
        doneButtonElement.classList.add('done');
        doneButtonElement.textContent = 'Done';
        doneButtonElement.addEventListener('click', e =>
            doneHandler(e)
        );

        const buttonsDivElement = document.createElement('div');
        buttonsDivElement.classList.add('buttons');
        buttonsDivElement.appendChild(editButtonElement);
        buttonsDivElement.appendChild(doneButtonElement);

        const liElement = document.createElement('li');
        liElement.classList.add('clean-task');
        liElement.appendChild(articleElement);
        liElement.appendChild(buttonsDivElement);

        return liElement;
    }

    function editHandler(e, data) {
        const liElement = e.currentTarget.parentElement.parentElement;
        liElement.remove();

        setInputValues(data);
    }

    function doneHandler(e) {
        const liElement = e.currentTarget.parentElement.parentElement;

        const buttonsElement = liElement.querySelector('.buttons');
        buttonsElement.remove();

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('delete');
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.addEventListener('click', e =>
            deleteHandler(e)
        );

        liElement.appendChild(deleteButtonElement);

        doneListElement.appendChild(liElement);
    }

    function deleteHandler(e) {
        const liElement = e.currentTarget.parentElement.parentElement;
        liElement.remove();
    }

    function clearInputValues() {
        document.getElementById('place').value = '';
        document.getElementById('action').value = '';
        document.getElementById('person').value = '';
    }

    function getInputValues() {
        const place = document.getElementById('place').value;
        const action = document.getElementById('action').value;
        const person = document.getElementById('person').value;

        return { place, action, person };
    }

    function setInputValues(data) {
        document.getElementById('place').value = data.place;
        document.getElementById('action').value = data.action;
        document.getElementById('person').value = data.person;
    }

    function isFormValid() {
        const place = document.getElementById('place').value.trim();
        const action = document.getElementById('action').value.trim();
        const person = document.getElementById('person').value.trim();

        return place && action && person;
    }
}
