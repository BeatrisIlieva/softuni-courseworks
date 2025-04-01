window.addEventListener('load', solve);

function solve() {
    const addButtonElement = document.getElementById('add-btn');
    const previewListElement = document.getElementById('preview-list');
    const archiveListElement = document.getElementById('archive-list');

    const nameInputElement = document.getElementById('name');
    const timeInputElement = document.getElementById('time');
    const descriptionElement = document.getElementById('description');

    addButtonElement.addEventListener('click', submitHandler);

    function submitHandler(e) {
        e.preventDefault();

        const nameInput = nameInputElement.value;
        const timeInput = timeInputElement.value;
        const description = descriptionElement.value;

        const inputs = [nameInput, timeInput, description];

        if(inputs.some(input => input.trim() == '')) {
            return;
        }

        addButtonElement.setAttribute('disabled', 'disabled');

        const paragraphs = inputs.map(input => createParagraph(input));

        const articleElement = document.createElement('article');
        articleElement.append(...paragraphs);

        const editButton = createButton('Edit', 'edit-btn');
        editButton.addEventListener('click', editHandler);

        const nextButton = createButton('Next', 'next-btn');
        nextButton.addEventListener('click', nextHandler);

        const divElement = document.createElement('div');
        divElement.classList.add('buttons');
        divElement.append(editButton, nextButton);

        const liElement = document.createElement('li');
        liElement.append(articleElement, divElement);

        previewListElement.append(liElement);

        nameInputElement.value = '';
        timeInputElement.value = '';
        descriptionElement.value = '';
    }

    function editHandler(e) {
        addButtonElement.removeAttribute('disabled');

        const previewListLiElement = previewListElement.querySelector('li');
        const paragraphs = previewListLiElement.querySelectorAll('p');
        previewListLiElement.remove();

        const inputs = [...paragraphs].map(paragraph => paragraph.textContent);

        nameInputElement.value = inputs[0];
        timeInputElement.value = inputs[1];
        descriptionElement.value = inputs[2];
    }

    function nextHandler(e) {
        const previewListLiElement = previewListElement.querySelector('li');

        const buttonsDivElement = previewListLiElement.querySelector('.buttons');
        buttonsDivElement.remove();

        const archiveButtonElement = createButton('Archive', 'archive-btn');
        archiveButtonElement.addEventListener('click', archiveHandler);
        previewListLiElement.append(archiveButtonElement);

        archiveListElement.append(previewListLiElement);
    }

    function archiveHandler(e) {
        const archiveListLiElement = archiveListElement.querySelector('li');

        archiveListLiElement.remove();

        addButtonElement.removeAttribute('disabled');
    }

    function createParagraph(content) {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = content;

        return paragraphElement;
    }

    function createButton(content, className) {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = content;
        buttonElement.classList.add(className);

        return buttonElement;
    }
}
