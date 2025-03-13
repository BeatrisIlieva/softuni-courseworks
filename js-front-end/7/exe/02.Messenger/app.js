function attachEvents() {
    const authorInputElement = document.querySelector(
        'input[name=author]'
    );
    const contentInputElement = document.querySelector(
        'input[name=content]'
    );

    const submitButtonElement = document.getElementById('submit');
    const refreshButtonElement = document.getElementById('refresh');

    const messagesElement = document.getElementById('messages');

    submitButtonElement.addEventListener('click', submitHandler);
    refreshButtonElement.addEventListener('click', refreshHandler);

    const baseUrl = 'http://localhost:3030/jsonstore/messenger';

    // refreshHandler();

    function submitHandler(e) {
        e.preventDefault();

        const author = authorInputElement.value;
        const content = contentInputElement.value;

        if (author.trim() === '' || content.trim() === '') {
            return;
        }

        const data = {
            author,
            content
        };

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                authorInputElement.value = '';
                contentInputElement.value = '';
            })
            .catch(err => console.log(err));
    }

    function refreshHandler(e) {
        fetch(baseUrl)
            .then(response => response.json())
            .then(result => createContent(result));
    }

    function createContent(data) {
        const result = Object.values(data)
            .map(element => {
                return `${element.author}: ${element.content}`;
            })
            .join('\n');

        messagesElement.value = result;
    }
}

attachEvents();
