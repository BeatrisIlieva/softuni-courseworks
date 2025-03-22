window.addEventListener('load', solve);

function solve() {
    const nextButtonElement = document.getElementById('next-btn');
    const emailInputElement = document.getElementById('email');
    const eventInputElement = document.getElementById('event');
    const locationInputElement = document.getElementById('location');
    const previewListElement =
        document.getElementById('preview-list');

    nextButtonElement.addEventListener('click', submitHandler);

    function submitHandler(e) {
        e.preventDefault();

        const emailInput = emailInputElement.value;
        const eventInput = eventInputElement.value;
        const locationInput = locationInputElement.value;

        if (emailInput.value == '') {
            return;
        }

        if (eventInput.value == '') {
            return;
        }

        if (locationInput.value == '') {
            return;
        }

        const isFormInvalid =
            !emailInput || !eventInput || !locationInput;

        if (isFormInvalid) {
            return;
        }

        emailInputElement.value = '';
        eventInputElement.value = '';
        locationInputElement.value = '';

        createPreviewList(emailInput, eventInput, locationInput);
    }

    function createParagraph(strongContent, freeText) {
        const strongElement = document.createElement('strong');
        strongElement.textContent = strongContent;

        const brElement = document.createElement('br');

        const paragraphElement = document.createElement('p');
        paragraphElement.append(strongElement);
        paragraphElement.append(brElement);

        paragraphElement.innerHTML += freeText;

        return paragraphElement;
    }

    function createButton(content, classNames) {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = content;

        classNames.forEach(className =>
            buttonElement.classList.add(className)
        );

        return buttonElement;
    }

    function editHandler(e) {
        const email = document.querySelector(
            '.application article h4'
        ).textContent;

        const applicationElement =
            document.querySelector('.application');

        const event = document
            .querySelector('.application article p:nth-of-type(1)')
            .textContent.split('Event:')[1]
            .trim();

        const location = document
            .querySelector('.application article p:nth-of-type(2)')
            .textContent.split('Location:')[1]
            .trim();

        emailInputElement.value = email;
        eventInputElement.value = event;
        locationInputElement.value = location;

        applicationElement.remove();
    }

    function applyHandler(e) {
        const applicationElement =
            document.querySelector('.application');

        const eventList = document.getElementById('event-list');

        const buttonElements =
            applicationElement.querySelectorAll('button');

        buttonElements.forEach(button => button.remove());

        eventList.append(applicationElement);
    }

    function createPreviewList(
        emailInput,
        eventInput,
        locationInput
    ) {
        const headingElement = document.createElement('h4');
        headingElement.textContent = emailInput;

        const firstParagraphElement = createParagraph(
            'Event:',
            eventInput
        );

        const secondParagraphElement = createParagraph(
            'Location:',
            locationInput
        );

        const articleElement = document.createElement('article');
        articleElement.append(
            headingElement,
            firstParagraphElement,
            secondParagraphElement
        );

        const editButtonElement = createButton('edit', [
            'action-btn',
            'edit'
        ]);

        editButtonElement.addEventListener('click', editHandler);

        const applyButtonElement = createButton('apply', [
            'action-btn',
            'apply'
        ]);

        applyButtonElement.addEventListener('click', applyHandler);

        const liElement = document.createElement('li');
        liElement.classList.add('application');

        liElement.append(
            articleElement,
            editButtonElement,
            applyButtonElement
        );

        previewListElement.append(liElement);
    }
}
