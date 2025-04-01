const baseUrl = 'http://localhost:3030/jsonstore/tasks';

const formElement = document.querySelector('form');

const loadCourseButtonElement = document.getElementById('load-course');
const addCourseButtonElement = document.getElementById('add-course');
const editCourseButtonElement = document.getElementById('edit-course');
const listElement = document.getElementById('list');

loadCourseButtonElement.addEventListener('click', loadHandler);
addCourseButtonElement.addEventListener('click', addHandler);
editCourseButtonElement.addEventListener('click', editHandler);
formElement.addEventListener('submit', e => e.preventDefault());

function loadHandler() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            listElement.innerHTML = '';

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                fragment.appendChild(createContainerDivElement(item));
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
            clearInputValues();
            loadHandler();
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(() => {
            clearInputValues();
            loadHandler();
            toggleButtons(addCourseButtonElement, editCourseButtonElement);
        })
        .catch(err => console.log(err.message));
}

function createContainerDivElement(data) {
    const titleH2Element = document.createElement('h2');
    titleH2Element.textContent = data.title;

    const teacherH3Element = document.createElement('h3');
    teacherH3Element.textContent = data.teacher;

    const typeH3Element = document.createElement('h3');
    typeH3Element.textContent = data.type;

    const descriptionH4Element = document.createElement('h4');
    descriptionH4Element.textContent = data.description;

    const editButtonElement = document.createElement('button');
    editButtonElement.classList.add('edit-btn');
    editButtonElement.textContent = 'Edit Course';
    editButtonElement.addEventListener('click', e => innerEditHandler(e, data));

    const finishButtonElement = document.createElement('button');
    finishButtonElement.classList.add('finish-btn');
    finishButtonElement.textContent = 'Finish Course';
    finishButtonElement.addEventListener('click', e => finishHandler(e, data));

    const containerDivElement = document.createElement('div');
    containerDivElement.classList.add('container');
    containerDivElement.appendChild(titleH2Element);
    containerDivElement.appendChild(teacherH3Element);
    containerDivElement.appendChild(typeH3Element);
    containerDivElement.appendChild(descriptionH4Element);
    containerDivElement.appendChild(editButtonElement);
    containerDivElement.appendChild(finishButtonElement);

    return containerDivElement;
}

function innerEditHandler(e, data) {
    const itemId = data._id;

    formElement.setAttribute('data-id', itemId);

    const containerDivElement = e.currentTarget.parentElement;
    containerDivElement.remove();

    setInputValues(data);

    toggleButtons(editCourseButtonElement, addCourseButtonElement);
}

function finishHandler(e, data) {
    const itemId = data._id;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    })
        .then(loadHandler)
        .catch(err => console.log(err.message));
}

function getInputValues() {
    const title = document.getElementById('course-name').value;
    const type = document.getElementById('course-type').value;
    const description = document.getElementById('description').value;
    const teacher = document.getElementById('teacher-name').value;

    return { title, type, description, teacher };
}

function setInputValues(data) {
    document.getElementById('course-name').value = data.title;
    document.getElementById('course-type').value = data.type;
    document.getElementById('description').value = data.description;
    document.getElementById('teacher-name').value = data.teacher;
}

function clearInputValues() {
    document.getElementById('course-name').value = '';
    document.getElementById('course-type').value = '';
    document.getElementById('description').value = '';
    document.getElementById('teacher-name').value = '';
}

function isFormValid() {
    const title = document.getElementById('course-name').value.trim();
    const type = document.getElementById('course-type').value.trim();
    const description = document.getElementById('description').value.trim();
    const teacher = document.getElementById('teacher-name').value.trim();

    return title && type && description && teacher;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
