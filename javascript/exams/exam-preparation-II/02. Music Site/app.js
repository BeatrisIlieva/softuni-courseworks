window.addEventListener('load', solve);

function solve() {
    const allHitsContainerDivElement = document.querySelector('.all-hits-container');
    const savedContainerDivElement = document.querySelector('.saved-container');

    const likesPElement = document.querySelector('.likes > p');

    const addButtonElement = document.getElementById('add-btn');
    addButtonElement.addEventListener('click', addHandler);

    function addHandler(e) {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        const inputValues = geInputValues();
        clearInputValues();
        allHitsContainerDivElement.appendChild(createHitsInfoDivElement(inputValues));
    }

    function createHitsInfoDivElement(data) {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', './static/img/img.png');

        const genreH2Element = document.createElement('h2');
        genreH2Element.textContent = `Genre: ${data.genre}`;

        const nameH2Element = document.createElement('h2');
        nameH2Element.textContent = `Name: ${data.name}`;

        const authorH2Element = document.createElement('h2');
        authorH2Element.textContent = `Author: ${data.author}`;

        const dateH3Element = document.createElement('h3');
        dateH3Element.textContent = `Date: ${data.date}`;

        const saveButtonElement = document.createElement('button');
        saveButtonElement.classList.add('save-btn');
        saveButtonElement.textContent = 'Save song';
        saveButtonElement.addEventListener('click', e => saveHandler(e, data));

        const likeButtonElement = document.createElement('button');
        likeButtonElement.classList.add('like-btn');
        likeButtonElement.textContent = 'Like song';
        likeButtonElement.addEventListener('click', e => likeHandler(e, data));

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('delete-btn');
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.addEventListener('click', e => deleteHandler(e, data));

        const hitsInfoDivElement = document.createElement('div');
        hitsInfoDivElement.classList.add('hits-info');
        hitsInfoDivElement.appendChild(imgElement);
        hitsInfoDivElement.appendChild(genreH2Element);
        hitsInfoDivElement.appendChild(nameH2Element);
        hitsInfoDivElement.appendChild(authorH2Element);
        hitsInfoDivElement.appendChild(dateH3Element);
        hitsInfoDivElement.appendChild(saveButtonElement);
        hitsInfoDivElement.appendChild(likeButtonElement);
        hitsInfoDivElement.appendChild(deleteButtonElement);

        return hitsInfoDivElement;
    }

    function saveHandler(e, data) {
        const hitsInfoDivElement = e.currentTarget.parentElement;

        const saveSongButtonElement = hitsInfoDivElement.querySelector('.save-btn');
        saveSongButtonElement.remove();

        const likeSongButtonElement = hitsInfoDivElement.querySelector('.like-btn');
        likeSongButtonElement.remove();

        savedContainerDivElement.appendChild(hitsInfoDivElement);
    }

    function likeHandler(e, data) {
        const parentElement = e.currentTarget.parentElement;
        parentElement.setAttribute('data-liked', 'true');

        const likeButtonElement = e.currentTarget;
        likeButtonElement.setAttribute('disabled', 'disabled');

        const text = likesPElement.textContent;
        const countBefore = text.match(/\d+/)[0];
        const countAfter = Number(countBefore);
        likesPElement.textContent = text.replace(countBefore, countAfter + 1);
    }

    function deleteHandler(e, data) {
        const hitsInfoDivElement = e.currentTarget.parentElement;
        // const isLiked = hitsInfoDivElement.getAttribute('data-liked');

        hitsInfoDivElement.remove();

        // if (isLiked) {
        //     const text = likesPElement.textContent;
        //     const countBefore = text.match(/\d+/)[0];
        //     const countAfter = Number(countBefore);
        //     likesPElement.textContent = text.replace(countBefore, countAfter - 1);
        // }
    }

    function geInputValues() {
        const genre = document.getElementById('genre').value;
        const name = document.getElementById('name').value;
        const author = document.getElementById('author').value;
        const date = document.getElementById('date').value;

        return { genre, name, author, date };
    }

    function clearInputValues() {
        document.getElementById('genre').value = '';
        document.getElementById('name').value = '';
        document.getElementById('author').value = '';
        document.getElementById('date').value = '';
    }

    function isFormValid() {
        const genre = document.getElementById('genre').value.trim();
        const name = document.getElementById('name').value.trim();
        const author = document.getElementById('author').value.trim();
        const date = document.getElementById('date').value.trim();

        return genre && name && author && date;
    }
}
