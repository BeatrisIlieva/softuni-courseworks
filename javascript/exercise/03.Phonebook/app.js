function attachEvents() {
    const phonebookUlElement = document.getElementById('phonebook');
    const personInputElement = document.getElementById('person');
    const phoneInputElement = document.getElementById('phone');
    const createButtonElement = document.getElementById('btnCreate');
    const loadButtonelement = document.getElementById('btnLoad');

    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    createButtonElement.addEventListener('click', submitHandler);
    loadButtonelement.addEventListener('click', loadHandler);

    function submitHandler(e) {
        const person = personInputElement.value;
        const phone = phoneInputElement.value;

        if (person.trim() == '' || phone.trim() == '') {
            return;
        }

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person,
                phone
            })
        })
            .then(response => response.json())
            .then(result => {
                phonebookUlElement.appendChild(
                    createLiElement(result)
                );

                personInputElement.value = '';
                phoneInputElement.value = '';
            })
            .catch(err => console.log(err.message));
    }

    function deleteHandler(itemId) {
        fetch(`${baseUrl}/${itemId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(result => {
                document.getElementById(itemId).remove();
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    function loadHandler(e) {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                phonebookUlElement.innerHTML = '';

                Object.values(data).forEach(item => {
                    phonebookUlElement.appendChild(
                        createLiElement(item)
                    );
                });
            })
            .catch(err => console.log(err.message));
    }

    function createLiElement(data) {
        const liElement = document.createElement('li');
        liElement.id = data._id;
        liElement.textContent = `${data.person}: ${data.phone}`;

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.addEventListener('click', () =>
            deleteHandler(data._id)
        );

        liElement.appendChild(deleteButtonElement);

        return liElement;
    }
}

attachEvents();
