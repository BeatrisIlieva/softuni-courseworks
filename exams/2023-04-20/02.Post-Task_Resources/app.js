window.addEventListener('load', solve);

function solve() {
    const reviewListUlElement = document.getElementById('review-list');
    const publishedListUlElement = document.getElementById('published-list');

    const publishButtonElement = document.getElementById('publish-btn');

    publishButtonElement.addEventListener('click', publishHandler);

    function publishHandler(e) {
        if (!isFormValid()) {
            return;
        }

        const inputValues = getInputValues();
        clearInputValues();
        reviewListUlElement.appendChild(createRPostLiElement(inputValues));
    }

    function createRPostLiElement(data) {
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

        const liElement = document.createElement('li');
        liElement.classList.add('rpost');
        liElement.appendChild(articleElement);
        liElement.appendChild(editButtonElement);
        liElement.appendChild(postButtonElement);

        return liElement;
    }

    function editHandler(e, data) {
        setInputValues(data);

        e.currentTarget.parentElement.remove();
    }

    function postHandler(e, data) {
        const liElement = e.currentTarget.parentElement;
        const buttons = liElement.querySelectorAll('button');
        Array.from(buttons).forEach(button => button.remove());

        publishedListUlElement.appendChild(liElement);
    }

    function getInputValues() {
        const title = document.getElementById('task-title').value;
        const category = document.getElementById('task-category').value;
        const content = document.getElementById('task-content').value;

        return { title, category, content };
    }

    function setInputValues(data) {
        document.getElementById('task-title').value = data.title;
        document.getElementById('task-category').value = data.category;
        document.getElementById('task-content').value = data.content;
    }

    function clearInputValues(data) {
        document.getElementById('task-title').value = '';
        document.getElementById('task-category').value = '';
        document.getElementById('task-content').value = '';
    }

    function isFormValid() {
        const title = document.getElementById('task-title').value.trim();
        const category = document.getElementById('task-category').value.trim();
        const content = document.getElementById('task-content').value.trim();

        return title && category && content;
    }
}
