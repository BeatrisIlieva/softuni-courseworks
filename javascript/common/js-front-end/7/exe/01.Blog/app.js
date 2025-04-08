function attachEvents() {
    const btnLoadPostsElement =
        document.getElementById('btnLoadPosts');
    const postsSelectElement = document.getElementById('posts');
    const btnViewPostElement = document.getElementById('btnViewPost');
    const postBodyElement = document.getElementById('post-body');
    const postCommentsElement =
        document.getElementById('post-comments');

    const postTitleElement = document.getElementById('post-title');

    const baseUrl = 'http://localhost:3030/jsonstore/blog';

    btnLoadPostsElement.addEventListener('click', loadHandler);

    btnViewPostElement.addEventListener('click', displayHandler);

    function loadHandler(e) {
        fetch(`${baseUrl}/posts`)
            .then(response => response.json())
            .then(result => {
                postsSelectElement.innerHTML = '';
                
                const options = createOptions(result);
                postsSelectElement.appendChild(options);
            })
            .catch(err => console.log(err));
    }

    function displayHandler(e) {
        fetch(`${baseUrl}/posts`)
            .then(response => response.json())
            .then(result => {
                const postId = postsSelectElement.value;
                const postTitle = postsSelectElement.querySelector('option:checked').textContent;

                postTitleElement.textContent = postTitle;

                const content = getTextContent(result, postId);

                postBodyElement.textContent = content;

                postCommentsElement.innerHTML = '';

                fetch(`${baseUrl}/comments`)
                    .then(response => response.json())
                    .then(result => {
                        const liElements = createLiElements(
                            postId,
                            result
                        );
                        postCommentsElement.appendChild(liElements);
                    });
            });
    }

    function createOptions(data) {
        const fragmentElement = document.createDocumentFragment();

        Object.values(data).forEach(element => {
            const optionElement = document.createElement('option');

            optionElement.value = element.id;
            optionElement.textContent = element.title;

            fragmentElement.appendChild(optionElement);
        });

        return fragmentElement;
    }

    function createLiElements(postId, data) {
        const fragmentElement = document.createDocumentFragment();

        Object.values(data)
            .filter(element => element.postId === postId)
            .forEach(element => {
                const liElement = document.createElement('li');
                liElement.textContent = element.text;

                fragmentElement.appendChild(liElement);
            });

        return fragmentElement;
    }

    function getTextContent(data, postId) {
        const postObj = data[postId];

        return postObj.body;
    }
}

attachEvents();
