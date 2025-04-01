window.addEventListener('load', solve);

function solve() {
    const previewListElement = document.getElementById('preview-list');
    const candidatesListElement = document.getElementById('candidates-list');

    const nextButtonElement = document.getElementById('next-btn');
    nextButtonElement.addEventListener('click', nextHandler);

    function nextHandler() {
        if (!isFormValid()) {
            return;
        }

        const inputValues = getInputValues();
        disableNextButton();
        clearInputValues();

        const applicationLiElement = cerateApplicationLiElement(inputValues);
        previewListElement.appendChild(applicationLiElement);
    }

    function cerateApplicationLiElement(data) {
        const studentH4Element = document.createElement('h4');
        studentH4Element.textContent = data.student;

        const universityPElement = document.createElement('p');
        universityPElement.textContent = `University: ${data.university}`;

        const scorePElement = document.createElement('p');
        scorePElement.textContent = `Score: ${data.score}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(studentH4Element);
        articleElement.appendChild(universityPElement);
        articleElement.appendChild(scorePElement);

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('action-btn', 'edit');
        editButtonElement.textContent = 'edit';
        editButtonElement.addEventListener('click', e => editHandler(e, data));

        const applyButtonElement = document.createElement('button');
        applyButtonElement.classList.add('action-btn', 'apply');
        applyButtonElement.textContent = 'apply';
        applyButtonElement.addEventListener('click', e => applyHandler(e, data));

        const applicationLiElement = document.createElement('li');
        applicationLiElement.classList.add('application');
        applicationLiElement.appendChild(articleElement);
        applicationLiElement.appendChild(editButtonElement);
        applicationLiElement.appendChild(applyButtonElement);

        return applicationLiElement;
    }

    function editHandler(e, data) {
        const applicationLiElement = e.currentTarget.parentElement;
        applicationLiElement.remove();
        enableNextButton();

        setInputValues(data);
    }

    function applyHandler(e, data) {
        const applicationLiElement = e.currentTarget.parentElement;
        const buttonElements = applicationLiElement.querySelectorAll('button');

        Array.from(buttonElements).forEach(button => button.remove());
        candidatesListElement.appendChild(applicationLiElement);
        enableNextButton();
    }

    function isFormValid() {
        const student = document.getElementById('student').value.trim();
        const university = document.getElementById('university').value.trim();
        const score = document.getElementById('score').value.trim();

        return student && university && score;
    }

    function getInputValues() {
        const student = document.getElementById('student').value;
        const university = document.getElementById('university').value;
        const score = document.getElementById('score').value;

        return { student, university, score };
    }

    function setInputValues(data) {
        document.getElementById('student').value = data.student;
        document.getElementById('university').value = data.university;
        document.getElementById('score').value = data.score;
    }

    function clearInputValues(data) {
        document.getElementById('student').value = '';
        document.getElementById('university').value = '';
        document.getElementById('score').value = '';
    }

    function disableNextButton() {
        nextButtonElement.setAttribute('disabled', 'disabled');
    }

    function enableNextButton() {
        nextButtonElement.removeAttribute('disabled');
    }
}
