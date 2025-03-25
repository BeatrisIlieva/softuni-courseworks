window.addEventListener('load', solve);

function solve() {
    let articlesCount = 0;
    const taskIdInputElement = document.getElementById('task-id');

    const formElement = document.getElementById('create-task-form');

    const titleInputElement = document.getElementById('title');
    const descriptionTextareaElement = document.getElementById('description');
    const labelSelectElement = document.getElementById('label');
    const pointsInputElement = document.getElementById('points');
    const assigneeInputElement = document.getElementById('assignee');

    const createButtonElement = document.getElementById('create-task-btn');
    const deleteButtonElement = document.getElementById('delete-task-btn');

    const totalCountElement = document.getElementById('total-sprint-points');
    const taskSectionElement = document.getElementById('tasks-section');

    const totalSprintPointsElement = document.getElementById('total-sprint-points');

    const codeIcons = {
        Feature: '&#8865;',
        'Low Priority Bug': '&#9737;',
        'High Priority Bug': '&#9888;'
    };

    const classes = {
        Feature: 'feature',
        'Low Priority Bug': 'low-priority',
        'High Priority Bug': 'high-priority'
    };

    createButtonElement.addEventListener('click', createHandler);
    deleteButtonElement.addEventListener('click', deleteHandler);

    function deleteHandler() {
        const inputValues = getInputValues();
        clearInputValues();
        toggleButtons(createButtonElement, deleteButtonElement);

        const articleId = taskIdInputElement.value;

        const articleElement = document.getElementById(articleId);
        articleElement.remove();

        document.getElementById('title').removeAttribute('disabled');
        document.getElementById('description').removeAttribute('disabled');
        document.getElementById('label').removeAttribute('disabled');
        document.getElementById('points').removeAttribute('disabled');
        document.getElementById('assignee').removeAttribute('disabled');

        const currentTotalPoints = Number(totalSprintPointsElement.textContent.match(/\d+/)[0]);

        totalSprintPointsElement.textContent = `Total Points ${
            currentTotalPoints - Number(inputValues.points)
        }pts`;
    }

    function createHandler() {
        if (!isFormValid()) {
            return;
        }

        const inputValues = getInputValues();
        taskSectionElement.appendChild(createTaskArticle(inputValues));

        clearInputValues();
    }

    function createTaskArticle(data) {
        articlesCount += 1;

        const currentTotalPoints = Number(totalSprintPointsElement.textContent.match(/\d+/)[0]);

        totalSprintPointsElement.textContent = `Total Points ${
            currentTotalPoints + Number(data.points)
        }pts`;

        const labelDivElement = document.createElement('div');
        labelDivElement.classList.add('task-card-label', classes[data.label]);
        labelDivElement.innerHTML = `${data.label} ${codeIcons[data.label]}`;

        const titleH3Element = document.createElement('h3');
        titleH3Element.classList.add('task-card-title');
        titleH3Element.textContent = data.title;

        const descriptionPElement = document.createElement('p');
        descriptionPElement.classList.add('task-card-description');
        descriptionPElement.textContent = data.description;

        const pointsDivElement = document.createElement('div');
        pointsDivElement.classList.add('task-card-points');
        pointsDivElement.textContent = `Estimated at ${data.points} pts`;

        const assigneeDivElement = document.createElement('div');
        assigneeDivElement.classList.add('task-card-assignee');
        assigneeDivElement.textContent = `Assigned to: ${data.assignee}`;

        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'Delete';
        buttonElement.addEventListener('click', e => deleteButtonHandler(e, data));

        const actionsDivElement = document.createElement('div');
        actionsDivElement.classList.add('task-card-actions');
        actionsDivElement.appendChild(buttonElement);

        const articleElement = document.createElement('article');
        articleElement.classList.add('task-card');
        articleElement.setAttribute('id', `task-${articlesCount}`);

        articleElement.appendChild(labelDivElement);
        articleElement.appendChild(titleH3Element);
        articleElement.appendChild(descriptionPElement);
        articleElement.appendChild(pointsDivElement);
        articleElement.appendChild(assigneeDivElement);
        articleElement.appendChild(actionsDivElement);

        return articleElement;
    }

    function deleteButtonHandler(e, data) {
        setInputValues(data);
        toggleButtons(deleteButtonElement, createButtonElement);

        const articleElement = e.currentTarget.parentElement.parentElement;
        const articleId = articleElement.getAttribute('id');
        taskIdInputElement.value = articleId;

        document.getElementById('title').setAttribute('disabled', 'disabled');
        document.getElementById('description').setAttribute('disabled', 'disabled');
        document.getElementById('label').setAttribute('disabled', 'disabled');
        document.getElementById('points').setAttribute('disabled', 'disabled');
        document.getElementById('assignee').setAttribute('disabled', 'disabled');
    }

    function clearInputValues() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('label').value = 'Feature';
        document.getElementById('points').value = '';
        document.getElementById('assignee').value = '';
    }

    function setInputValues(data) {
        document.getElementById('title').value = data.title;
        document.getElementById('description').value = data.description;
        document.getElementById('label').value = data.label;
        document.getElementById('points').value = data.points;
        document.getElementById('assignee').value = data.assignee;
    }

    function getInputValues() {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const label = document.getElementById('label').value.trim();
        const points = document.getElementById('points').value.trim();
        const assignee = document.getElementById('assignee').value.trim();

        return { title, description, label, points, assignee };
    }

    function isFormValid() {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const label = document.getElementById('label').value.trim();
        const points = document.getElementById('points').value.trim();
        const assignee = document.getElementById('assignee').value.trim();

        return title && description && label && points && assignee;
    }

    function toggleButtons(buttonToEnable, buttonToDisable) {
        buttonToEnable.removeAttribute('disabled');
        buttonToDisable.setAttribute('disabled', 'disabled');
    }
}
