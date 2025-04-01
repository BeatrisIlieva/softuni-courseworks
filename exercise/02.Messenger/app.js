function attachEvents() {
    const baseUrl = ' http://localhost:3030/jsonstore/messenger';

    const submitButtonElement = document.getElementById('submit');
    const refreshButtonElement = document.getElementById('refresh');
    const authorInputElement = document.querySelector(
        'input[name=author]'
    );
    const contentInputElement = document.querySelector(
        'input[name=content]'
    );

    const messagesTextareaElement =
        document.getElementById('messages');

    refreshButtonElement.addEventListener('click', refreshHandler);

    submitButtonElement.addEventListener('click', submitHandler);

    async function refreshHandler(e) {
        try {
            const response = await fetch(baseUrl);
            const result = await response.json();

            messagesTextareaElement.value = '';

            displayMessages(Object.values(result));
        } catch (err) {
            console.log(err.message);
        }
    }

    // function refreshHandler(e) {
    //     fetch(baseUrl)
    //         .then(response => response.json())
    //         .then(result => {
    //             messagesTextareaElement.value = '';

    //             displayMessages(Object.values(result));
    //         })
    //         .catch(err => {
    //             console.log(err.message);
    //         });
    // }

    async function submitHandler(e) {
        try {
            const author = authorInputElement.value;
            const content = contentInputElement.value;

            if (author.trim() == '' || content.trim() == '') {
                return;
            }

            await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author,
                    content
                })
            });

            authorInputElement.value = '';
            contentInputElement.value = '';
        } catch (err) {
            console.log(err.message);
        }
    }

    // function submitHandler(e) {
    //     const author = authorInputElement.value;
    //     const content = contentInputElement.value;

    //     if (author.trim() == '' || content.trim() == '') {
    //         return;
    //     }

    //     fetch(baseUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             author,
    //             content
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             authorInputElement.value = '';
    //             contentInputElement.value = '';
    //         })
    //         .catch(err => console.log(err.message));
    // }

    function displayMessages(data) {
        const result = [];

        data.forEach(item => {
            result.push(`${item.author}: ${item.content}`);
        });

        messagesTextareaElement.value = result.join('\n');
    }
}

attachEvents();
