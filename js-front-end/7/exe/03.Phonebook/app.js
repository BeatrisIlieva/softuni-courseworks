function attachEvents() {
    const btnLoadElement = document.getElementById('btnLoad');
    const btnCreateElement = document.getElementById('btnCreate');
    const phonebookElement = document.getElementById('phonebook');
    const personInputElement = document.getElementById('person');
    const phoneInputElement = document.getElementById('phone');

    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    btnLoadElement.addEventListener('click', loadHandler);

    btnCreateElement.addEventListener('click', submitHandler);

    function loadHandler(e) {
        fetch(baseUrl)
            .then(response => response.json())
            .then(result => {
                phonebookElement.innerHTML = '';

                const fragment = document.createDocumentFragment();

                Object.values(result).forEach(element => {
                    fragment.appendChild(createLiElement(element));
                });

                phonebookElement.appendChild(fragment);
            })
            .catch(err => console.log(err));
    }

    function createLiElement(data) {
        const liElement = document.createElement('li');
        liElement.id = data._id;
        liElement.textContent = `${data.person}: ${data.phone}`;

        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'Delete';

        buttonElement.addEventListener('click', e => {
            fetch(`${baseUrl}/${data._id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(result => {
                    liElement.remove();
                })
                .catch(err => console.log(err.message));
        });

        liElement.appendChild(buttonElement);

        return liElement;
    }

    function submitHandler(e) {
        const person = personInputElement.value;
        const phone = phoneInputElement.value;

        if (person.trim() === '' || phone.trim() === '') {
            return;
        }

        const data = { person, phone };

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                const liElement = createLiElement(result);
                phonebookElement.appendChild(liElement);

                personInputElement.value = '';
                phoneInputElement.value = '';
            })
            .catch(err => console.log(err));
    }
}

attachEvents();
