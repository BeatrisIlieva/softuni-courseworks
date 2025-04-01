function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/tasks';

    const loadButtonElement = document.getElementById('load-board-btn');
    const cerateButtonElement = document.getElementById('create-task-btn');

    const toDoUlElement = document.querySelector('#todo-section ul');
    const inProgressUlElement = document.querySelector('#in-progress-section ul');
    const codeReviewUlElement = document.querySelector('#code-review-section ul');
    const doneUlElement = document.querySelector('#done-section ul');

    loadButtonElement.addEventListener('click', loadHandler);
    cerateButtonElement.addEventListener('click', addToToDoElement);

    function addToToDoElement() {
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

    const buttonTitles = {
        ToDo: 'Move to In Progress',
        'In Progress': 'Move to Code Review',
        'Code Review': 'Move to Done',
        Done: 'Close'
    };

    const moveMapper = {
        ToDo: data => moveToProgressList(data),
        'In Progress': data => moveToCodeReviewList(data),
        'Code Review': data => moveToCloseList(data),
        Done: data => closeTask(data)
    };

    function closeTask(data) {
        const itemId = data._id;

        fetch(`${baseUrl}/${itemId}`, {
            method: 'DELETE'
        })
            .then(() => loadHandler())
            .catch(err => console.log(err.message));
    }

    function loadHandler() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(result => {
                toDoUlElement.innerHTML = '';
                inProgressUlElement.innerHTML = '';
                codeReviewUlElement.innerHTML = '';
                doneUlElement.innerHTML = '';

                const tasksObj = {
                    ToDo: { tasks: [], ulElement: toDoUlElement },
                    'In Progress': { tasks: [], ulElement: inProgressUlElement },
                    'Code Review': { tasks: [], ulElement: codeReviewUlElement },
                    Done: { tasks: [], ulElement: doneUlElement }
                };

                Object.values(result).forEach(item => {
                    tasksObj[item.status].tasks.push(item);
                });

                Object.values(tasksObj).forEach(value => {
                    const fragment = document.createDocumentFragment();

                    value.tasks.forEach(item => {
                        const liElement = createTaskLiElement(item);

                        fragment.appendChild(liElement);
                    });

                    value.ulElement.appendChild(fragment);
                });
            })
            .catch(err => console.log(err.message));
    }

    function moveToProgressList(data) {
        const itemId = data._id;

        fetch(`${baseUrl}/${itemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'In Progress' })
        })
            .then(() => {
                loadHandler();
            })
            .catch(err => console.log(err.message));
    }

    function moveToCodeReviewList(data) {
        const itemId = data._id;

        fetch(`${baseUrl}/${itemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Code Review' })
        })
            .then(() => {
                loadHandler();
            })
            .catch(err => console.log(err.message));
    }

    function moveToCloseList(data) {
        const itemId = data._id;

        fetch(`${baseUrl}/${itemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Done' })
        })
            .then(() => {
                loadHandler();
            })
            .catch(err => console.log(err.message));
    }

    function createTaskLiElement(data) {
        const titleH3Element = document.createElement('h3');
        titleH3Element.textContent = data.title;

        const descriptionPElement = document.createElement('p');
        descriptionPElement.textContent = data.description;

        const buttonElement = document.createElement('button');
        buttonElement.textContent = buttonTitles[data.status];
        buttonElement.addEventListener('click', e => moveMapper[data.status](data));

        const liElement = document.createElement('li');
        liElement.classList.add('task');
        liElement.appendChild(titleH3Element);
        liElement.appendChild(descriptionPElement);
        liElement.appendChild(buttonElement);

        return liElement;
    }

    function getInputValues() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const status = 'ToDo';

        return { title, description, status };
    }

    function isFormValid() {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();

        return title && description;
    }

    function clearInputValues() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    }
}

attachEvents();
