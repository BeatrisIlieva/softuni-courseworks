function attachEvents() {
    const loadPostButtonElement =
        document.getElementById('btnLoadPosts');
    const viewPostButtonElement =
        document.getElementById('btnViewPost');

    const postsSelectElement = document.getElementById('posts');
    const postTitleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');
    const postCommentsElement =
        document.getElementById('post-comments');

    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl =
        'http://localhost:3030/jsonstore/blog/comments';

    loadPostButtonElement.addEventListener('click', loadHandler);

    async function loadHandler(e) {
        try {
            postsSelectElement.innerHTML = '';

            const response = await fetch(postsUrl);
            const result = await response.json();

            const fragment = document.createDocumentFragment();

            Object.values(result).forEach(item => {
                fragment.appendChild(createOptionElement(item));
            });

            postsSelectElement.appendChild(fragment);
        } catch (err) {
            console.log(err.message);
        }
    }

    // function loadHandler(e) {
    //     fetch(postsUrl)
    //         .then(response => response.json())
    //         .then(result => {
    //             postsSelectElement.innerHTML = '';

    //             const fragment = document.createDocumentFragment();

    //             Object.values(result).forEach(item => {
    //                 fragment.appendChild(createOptionElement(item));
    //             });

    //             postsSelectElement.appendChild(fragment);
    //         });
    // }

    viewPostButtonElement.addEventListener('click', viewHandler);

    async function viewHandler(e) {
        try {
            postCommentsElement.innerHTML = '';

            const postId = postsSelectElement.value;
            const postTitle =
                postsSelectElement.querySelector(
                    'option:checked'
                ).textContent;

            postTitleElement.textContent = postTitle;

            const postsResponse = await fetch(postsUrl);
            const posts = await postsResponse.json();

            const commentsResponse = await fetch(commentsUrl);
            const comments = await commentsResponse.json();

            postBodyElement.textContent = posts[postId].body;

            const fragment = document.createDocumentFragment();

            const filteredPosts = Object.values(comments).filter(
                item => item.postId == postId
            );

            filteredPosts.forEach(item =>
                fragment.appendChild(createLiElement(item))
            );

            postCommentsElement.appendChild(fragment);
        } catch (err) {
            console.log(err.message);
        }
    }

    // function viewHandler(e) {
    //     const postsLength =
    //         postsSelectElement.querySelectorAll('option').length;

    //     if (postsLength == 0) {
    //         return;
    //     }
    //     const postId = postsSelectElement.value;
    //     const postTitle =
    //         postsSelectElement.querySelector(
    //             'option:checked'
    //         ).textContent;

    //     postTitleElement.textContent = postTitle;

    //     Promise.all([fetch(postsUrl), fetch(commentsUrl)])
    //         .then(responses =>
    //             Promise.all(responses.map(res => res.json()))
    //         )
    //         .then(data => {
    //             postCommentsElement.innerHTML = '';

    //             const [posts, comments] = data;

    //             postBodyElement.textContent = posts[postId].body;

    //             const fragment = document.createDocumentFragment();

    //             const filteredPosts = Object.values(comments).filter(
    //                 item => item.postId == postId
    //             );

    //             filteredPosts.forEach(item =>
    //                 fragment.appendChild(createLiElement(item))
    //             );

    //             postCommentsElement.appendChild(fragment);
    //         });
    // }

    function createLiElement(data) {
        const liElement = document.createElement('li');
        liElement.textContent = data.text;

        return liElement;
    }

    function createOptionElement(data) {
        const optionElement = document.createElement('option');
        optionElement.value = data.id;
        optionElement.textContent = data.title;

        return optionElement;
    }
}

attachEvents();
