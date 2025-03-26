window.addEventListener('load', solve);

function solve() {
    const mainDivElement = document.getElementById('main');

    const submitButtonElement = document.getElementById('form-btn');

    const previewListUlElement = document.getElementById('preview-list');

    submitButtonElement.addEventListener('click', submitHandler);

    function submitHandler(e) {
        if (!isFormValid()) {
            return;
        }

        const inputValues = getInputValues();
        disablePublishButton();
        clearInputValue();

        const liElement = createStoryInfoLiElement(inputValues);
        previewListUlElement.appendChild(liElement);
    }

    function createStoryInfoLiElement(data) {
        const fullNameH4Element = document.createElement('h4');
        fullNameH4Element.textContent = `Name: ${data.firstName} ${data.lastName}`;

        const agePElement = document.createElement('p');
        agePElement.textContent = `Age: ${data.age}`;

        const titlePElement = document.createElement('p');
        titlePElement.textContent = `Title: ${data.title}`;

        const genrePElement = document.createElement('p');
        genrePElement.textContent = `Genre: ${data.genre}`;

        const storyPElement = document.createElement('p');
        storyPElement.textContent = data.story;

        const articleElement = document.createElement('article');
        articleElement.appendChild(fullNameH4Element);
        articleElement.appendChild(agePElement);
        articleElement.appendChild(titlePElement);
        articleElement.appendChild(genrePElement);
        articleElement.appendChild(storyPElement);

        const saveButtonElement = document.createElement('button');
        saveButtonElement.classList.add('save-btn');
        saveButtonElement.textContent = 'Save Story';
        saveButtonElement.addEventListener('click', e => saveHandler(e, data));

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit-btn');
        editButtonElement.textContent = 'Edit Story';
        editButtonElement.addEventListener('click', e => editHandler(e, data));

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('delete-btn');
        deleteButtonElement.textContent = 'Delete Story';
        deleteButtonElement.addEventListener('click', e => deleteHandler(e, data));

        const liElement = document.createElement('li');
        liElement.classList.add('story-info');
        liElement.appendChild(articleElement);
        liElement.appendChild(saveButtonElement);
        liElement.appendChild(editButtonElement);
        liElement.appendChild(deleteButtonElement);

        return liElement;
    }

    function saveHandler(e, data) {
        mainDivElement.innerHTML = '';

        const h1Element = document.createElement('h1');
        h1Element.textContent = `Your scary story is saved!`;

        mainDivElement.appendChild(h1Element);
    }

    function editHandler(e, data) {
        setInputValues(data);

        const liElement = e.currentTarget.parentElement;
        liElement.remove();

        enablePublishButton();
    }

    function deleteHandler(e, data) {
        const liElement = e.currentTarget.parentElement;
        liElement.remove();

        enablePublishButton();
    }

    function getInputValues() {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const age = document.getElementById('age').value;
        const title = document.getElementById('story-title').value;
        const genre = document.getElementById('genre').value;
        const story = document.getElementById('story').value;

        return { firstName, lastName, age, title, genre, story };
    }

    function clearInputValue() {
        document.getElementById('first-name').value = '';
        document.getElementById('last-name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('story-title').value = '';
        document.getElementById('genre').value = 'Disturbing';
        document.getElementById('story').value = '';
    }

    function setInputValues(data) {
        document.getElementById('first-name').value = data.firstName;
        document.getElementById('last-name').value = data.lastName;
        document.getElementById('age').value = data.age;
        document.getElementById('story-title').value = data.title;
        document.getElementById('genre').value = data.genre;
        document.getElementById('story').value = data.story;
    }

    function isFormValid() {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const age = document.getElementById('age').value.trim();
        const title = document.getElementById('story-title').value.trim();
        const genre = document.getElementById('genre').value.trim();
        const story = document.getElementById('story').value.trim();

        return firstName && lastName && age && title && genre && story;
    }

    function disablePublishButton() {
        submitButtonElement.setAttribute('disabled', 'disabled');
    }

    function enablePublishButton() {
        submitButtonElement.removeAttribute('disabled');
    }
}
