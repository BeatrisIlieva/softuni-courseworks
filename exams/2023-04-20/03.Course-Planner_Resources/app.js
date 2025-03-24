const baseUrl = 'http://localhost:3030/jsonstore/tasks';

const formElement = document.querySelector('form');

const titleInputElement = document.getElementById('course-name');
const typeInputElement = document.getElementById('course-type');
const teacherInputElement = document.getElementById('teacher-name');
const descriptionTextareaElement = document.getElementById('description');

const listDivElement = document.getElementById('list');

const loadButtonElement = document.getElementById('load-course');
const addCourseButtonElement = document.getElementById('add-course');
const editCourseButtonElement = document.getElementById('edit-course');

loadButtonElement.addEventListener('click', loadHandler);
addCourseButtonElement.addEventListener('click', addHandler);
editCourseButtonElement.addEventListener('click', editOuterHandler);

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

function editOuterHandler(e) {
    e.preventDefault();

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
    editButtonElement.addEventListener('click', e => editHandler(e, data));

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

function editHandler(e, data) {
    const containerDivElement = e.currentTarget.parentElement;
    containerDivElement.remove();

    setInputValues(data);

    toggleButtons(editCourseButtonElement, addCourseButtonElement);

    formElement.setAttribute('data-id', data._id);
}

function finishHandler(e, data) {
    const itemId = data._id;
    const containerDivElement = e.currentTarget.parentElement;

    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    }).then(() => {
        containerDivElement.remove();
        loadHandler();
    });
}

function clearInputValues() {
    document.getElementById('course-name').value = '';
    document.getElementById('course-type').value = '';
    document.getElementById('teacher-name').value = '';
    document.getElementById('description').value = '';
}

function setInputValues(data) {
    document.getElementById('course-name').value = data.title;
    document.getElementById('course-type').value = data.type;
    document.getElementById('teacher-name').value = data.teacher;
    document.getElementById('description').value = data.description;
}

function getInputValues() {
    const title = document.getElementById('course-name').value.trim();
    const type = document.getElementById('course-type').value.trim();
    const teacher = document.getElementById('teacher-name').value.trim();
    const description = document.getElementById('description').value.trim();

    return { title, type, teacher, description };
}

function isFormValid() {
    const title = document.getElementById('course-name').value.trim();
    const type = document.getElementById('course-type').value.trim();
    const teacher = document.getElementById('teacher-name').value.trim();
    const description = document.getElementById('description').value.trim();

    return title && type && teacher && description;
}

function toggleButtons(buttonToEnable, buttonToDisable) {
    buttonToEnable.removeAttribute('disabled');
    buttonToDisable.setAttribute('disabled', 'disabled');
}
