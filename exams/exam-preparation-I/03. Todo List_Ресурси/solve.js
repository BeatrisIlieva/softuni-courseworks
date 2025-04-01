function attachEvents() {
    const baseurl = 'http://localhost:3030/jsonstore/tasks';

    const addButtonElement = document.getElementById('add-button');
    const loadButtonElement = document.getElementById('load-button');

    const todoListUlElement = document.getElementById('todo-list');

    addButtonElement.addEventListener('click', e => addHandler(e));
    loadButtonElement.addEventListener('click', e => loadHandler(e));

    function addHandler(e) {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        const input = getInputValues();

        fetch(baseurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
            .then(() => {
                clearInputValues();

                fetch(baseurl)
                    .then(response => response.json())
                    .then(result => {
                        todoListUlElement.innerHTML = '';
                        const fragment = document.createDocumentFragment();

                        Object.values(result).forEach(item => {
                            const liElement = createLiElement(item);
                            fragment.appendChild(liElement);
                        });

                        todoListUlElement.appendChild(fragment);
                    });

                todoListUlElement.innerHTML = '';
                const fragment = document.createDocumentFragment();

                Object.values(result).forEach(item => {
                    const liElement = createLiElement(item);
                    fragment.appendChild(liElement);
                });

                todoListUlElement.appendChild(fragment);
            })
            .catch(err => console.log(err.message));
    }

    function loadHandler(e) {
        e.preventDefault();

        fetch(baseurl)
            .then(response => response.json())
            .then(result => {
                todoListUlElement.innerHTML = '';
                const fragment = document.createDocumentFragment();

                Object.values(result).forEach(item => {
                    const liElement = createLiElement(item);
                    fragment.appendChild(liElement);
                });

                todoListUlElement.appendChild(fragment);
            });
    }

    function createLiElement(data) {
        const spanElement = document.createElement('span');
        spanElement.textContent = data.name;

        const removeButtonElement = document.createElement('button');
        removeButtonElement.textContent = 'Remove';
        removeButtonElement.addEventListener('click', e => removeHandler(e, data));

        const editButtonElement = document.createElement('button');
        editButtonElement.textContent = 'Edit';
        editButtonElement.addEventListener('click', e => editHandler(e, data));

        const liElement = document.createElement('li');
        liElement.appendChild(spanElement);
        liElement.appendChild(removeButtonElement);
        liElement.appendChild(editButtonElement);

        return liElement;
    }

    function removeHandler(e, data) {
        const itemId = data._id;

        fetch(`${baseurl}/${itemId}`, {
            method: 'DELETE'
        })
            .then(() => {
                fetch(baseurl)
                    .then(response => response.json())
                    .then(result => {
                        todoListUlElement.innerHTML = '';
                        const fragment = document.createDocumentFragment();

                        Object.values(result).forEach(item => {
                            const liElement = createLiElement(item);
                            fragment.appendChild(liElement);
                        });

                        todoListUlElement.appendChild(fragment);
                    });
            })
            .catch(err => console.log(err.message));
    }

    function editHandler(e, data) {
        const liElement = e.currentTarget.parentElement;

        const spanElement = liElement.querySelector('span');
        spanElement.remove();

        const inputElement = document.createElement('input');
        inputElement.value = data.name;
        liElement.insertBefore(inputElement, liElement.firstChild);

        const editButtonElement = liElement.querySelector('button:nth-of-type(2)');
        editButtonElement.remove();

        const submitButtonElement = document.createElement('button');
        submitButtonElement.textContent = 'Submit';
        liElement.appendChild(submitButtonElement);

        submitButtonElement.addEventListener('click', e =>
            submitHandler(e, inputElement.value, data._id)
        );
    }

    function submitHandler(e, data, itemId) {
        const inputElement = document.querySelector('li > input');

        if (inputElement.value.trim() === '') {
            return;
        }

        fetch(`${baseurl}/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data })
        }).then(() => {
            fetch(baseurl)
                .then(response => response.json())
                .then(result => {
                    todoListUlElement.innerHTML = '';
                    const fragment = document.createDocumentFragment();

                    Object.values(result).forEach(item => {
                        const liElement = createLiElement(item);
                        fragment.appendChild(liElement);
                    });

                    todoListUlElement.appendChild(fragment);
                });
        });
    }

    function getInputValues() {
        const name = document.getElementById('title').value;

        return { name };
    }

    function clearInputValues() {
        document.getElementById('title').value = '';
    }

    function isFormValid() {
        return document.getElementById('title').value.trim();
    }
}

attachEvents();
