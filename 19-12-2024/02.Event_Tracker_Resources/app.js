window.addEventListener('load', solve);

function solve() {
    const saveButtonElement = document.getElementById('save');

    const upcomingListArticleElement =
        document.getElementById('upcoming-list');

    const eventInputElement = document.getElementById('event');
    const noteInputElement = document.getElementById('note');
    const dateInputElement = document.getElementById('date');

    saveButtonElement.addEventListener('click', submitHandler);

    const deleteButtonElement = document.querySelector('.btn.delete');

    deleteButtonElement.addEventListener('click', deleteHandler);

    function deleteHandler(e) {
        const eventListElements =
            document.querySelectorAll('#events-list li');
        eventListElements.forEach(el => el.remove());
    }

    function submitHandler(e) {
        e.preventDefault();

        const eventInput = eventInputElement.value;

        if (eventInput === '') {
            return;
        }

        const noteInput = noteInputElement.value;

        if (noteInput === '') {
            return;
        }

        const dateInput = dateInputElement.value;

        if (dateInput === '') {
            return;
        }

        const firstParagraph = document.createElement('p');
        firstParagraph.textContent = `Name: ${eventInput}`;

        const secondParagraph = document.createElement('p');
        secondParagraph.textContent = `Note: ${noteInput}`;

        const thirdParagraph = document.createElement('p');
        thirdParagraph.textContent = `Date: ${dateInput}`;

        const articleElement = document.createElement('article');

        articleElement.append(
            firstParagraph,
            secondParagraph,
            thirdParagraph
        );

        const divElement = document.createElement('div');
        divElement.classList.add('event-container');

        divElement.append(articleElement);

        const liElement = document.createElement('li');
        liElement.classList.add('event-item');

        const editButtonElement = document.createElement('button');
        editButtonElement.textContent = 'Edit';
        editButtonElement.classList.add('btn', 'edit');
        editButtonElement.addEventListener('click', editHandler);

        const doneButtonElement = document.createElement('button');
        doneButtonElement.textContent = 'Done';
        doneButtonElement.classList.add('btn', 'done');
        doneButtonElement.addEventListener('click', doneHandler);

        const buttonsElement = document.createElement('div');
        buttonsElement.classList.add('buttons');
        buttonsElement.append(editButtonElement, doneButtonElement);
        divElement.append(buttonsElement);
        liElement.append(divElement);

        upcomingListArticleElement.append(liElement);

        eventInputElement.value = '';
        noteInputElement.value = '';
        dateInputElement.value = '';
    }

    function editHandler(e) {
        const notAllowed =
            eventInputElement.value ||
            noteInputElement.value ||
            dateInputElement.value;

        if (notAllowed) {
            return;
        }

        const liElement =
            upcomingListArticleElement.querySelector('li');
        liElement.remove();

        const articleElement = liElement.querySelector('div article');

        const firstParagraph =
            articleElement.querySelector('p:nth-child(1)');
        const secondParagraph =
            articleElement.querySelector('p:nth-child(2)');
        const thirdParagraph =
            articleElement.querySelector('p:nth-child(3)');

        eventInputElement.value = firstParagraph.textContent.split('Name: ')[1];
        noteInputElement.value = secondParagraph.textContent.split('Note: ')[1];
        dateInputElement.value =
            thirdParagraph.textContent.split('Date: ')[1];
    }

    function doneHandler(e) {
        const buttonElement = e.currentTarget;
        const liElement = buttonElement.closest('.event-item');
        const articleElement = liElement.querySelector('article');

        liElement.innerHTML = '';

        liElement.append(articleElement);

        const eventsListElement =
            document.getElementById('events-list');

        eventsListElement.append(liElement);
    }
}
