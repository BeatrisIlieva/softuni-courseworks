window.addEventListener('load', solve);

function solve() {
    const publishButtonElement = document.getElementById('publish-btn');

    const reviewListUlListElement = document.getElementById('review-list');
    const publishedListUlListElement = document.getElementById('published-list');

    publishButtonElement.addEventListener('click', publishHandler);

    function publishHandler() {
        if (!isFormValid()) {
            return;
        }

        const inputValues = getInputValues();
        const postLiElement = createPostLiElement(inputValues);

        reviewListUlListElement.appendChild(postLiElement);

        clearInputValues();
        // disabledPublishButton();
    }

    function createPostLiElement(data) {
        const titleH4Element = document.createElement('h4');
        titleH4Element.textContent = data.title;

        const categoryPElement = document.createElement('p');
        categoryPElement.textContent = `Category: ${data.category}`;

        const contentPElement = document.createElement('p');
        contentPElement.textContent = `Content: ${data.content}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(titleH4Element);
        articleElement.appendChild(categoryPElement);
        articleElement.appendChild(contentPElement);

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('action-btn', 'edit');
        editButtonElement.textContent = 'Edit';
        editButtonElement.addEventListener('click', e => editHandler(e, data));

        const postButtonElement = document.createElement('button');
        postButtonElement.classList.add('action-btn', 'post');
        postButtonElement.textContent = 'Post';
        postButtonElement.addEventListener('click', e => postHandler(e, data));

        const postLiElement = document.createElement('li');
        postLiElement.classList.add('rpost');
        postLiElement.appendChild(articleElement);
        postLiElement.appendChild(editButtonElement);
        postLiElement.appendChild(postButtonElement);

        return postLiElement;
    }

    function editHandler(e, data) {
        const postLiElement = e.currentTarget.parentElement;
        postLiElement.remove();

        setInputValues(data);
        // enabledPublishButton();
    }

    function postHandler(e, data) {
        const postLiElement = e.currentTarget.parentElement;

        const buttons = postLiElement.querySelectorAll('button');
        Array.from(buttons).forEach(button => button.remove());

        publishedListUlListElement.appendChild(postLiElement);
    }

    function getInputValues() {
        const title = document.getElementById('task-title').value;
        const category = document.getElementById('task-category').value;
        const content = document.getElementById('task-content').value;

        return { title, category, content };
    }

    function clearInputValues() {
        document.getElementById('task-title').value = '';
        document.getElementById('task-category').value = '';
        document.getElementById('task-content').value = '';
    }

    function setInputValues(data) {
        document.getElementById('task-title').value = data.title;
        document.getElementById('task-category').value = data.category;
        document.getElementById('task-content').value = data.content;
    }

    function isFormValid() {
        const title = document.getElementById('task-title').value;
        const category = document.getElementById('task-category').value;
        const content = document.getElementById('task-content').value;

        return title && category && content;
    }
}
