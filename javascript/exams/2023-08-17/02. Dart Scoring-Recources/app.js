window.addEventListener('load', solve);

function solve() {
    const addButtonElement = document.getElementById('add-btn');
    const clearButtonElement = document.querySelector('.btn.clear');

    const sureListElement = document.getElementById('sure-list');
    const scoreboardListElement =
        document.getElementById('scoreboard-list');

    addButtonElement.addEventListener('click', addHandler);
    clearButtonElement.addEventListener('click', clearHandler);

    function addHandler() {
        if (!isFormValid()) {
            return;
        }

        const inputValues = getInputValues();

        const dartItemLiElement =
            createDartItemLiElement(inputValues);

        sureListElement.appendChild(dartItemLiElement);

        disabledAddButton();
        clearInputValues();
    }

    function clearHandler() {
        clearInputValues();

        sureListElement.innerHTML = '';
        scoreboardListElement.innerHTML = '';
    }

    function createDartItemLiElement(data) {
        const playerPElement = document.createElement('p');
        playerPElement.textContent = data.player;

        const scorePElement = document.createElement('p');
        scorePElement.textContent = `Score: ${data.score}`;

        const roundPElement = document.createElement('p');
        roundPElement.textContent = `Round: ${data.round}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(playerPElement);
        articleElement.appendChild(scorePElement);
        articleElement.appendChild(roundPElement);

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('btn', 'edit');
        editButtonElement.textContent = 'edit';
        editButtonElement.addEventListener('click', e =>
            editHandler(e, data)
        );

        const okButtonElement = document.createElement('button');
        okButtonElement.classList.add('btn', 'ok');
        okButtonElement.textContent = 'ok';
        okButtonElement.addEventListener('click', e =>
            okHandler(e, data)
        );

        const dartItemLiElement = document.createElement('li');
        dartItemLiElement.classList.add('dart-item');

        dartItemLiElement.appendChild(articleElement);
        dartItemLiElement.appendChild(editButtonElement);
        dartItemLiElement.appendChild(okButtonElement);

        return dartItemLiElement;
    }

    function editHandler(e, data) {
        setInputValues(data);

        e.currentTarget.parentElement.remove();

        enableAddButton();
    }

    function okHandler(e, data) {
        const dartItemLiElement = e.currentTarget.parentElement;
        const buttons = dartItemLiElement.querySelectorAll('button');

        Array.from(buttons).forEach(button => button.remove());

        scoreboardListElement.appendChild(dartItemLiElement);

        enableAddButton();
    }

    function disabledAddButton() {
        addButtonElement.setAttribute('disabled', 'disabled');
    }

    function enableAddButton() {
        addButtonElement.removeAttribute('disabled');
    }

    function getInputValues() {
        const player = document.getElementById('player').value;
        const score = document.getElementById('score').value;
        const round = document.getElementById('round').value;

        return { player, score, round };
    }

    function clearInputValues() {
        document.getElementById('player').value = '';
        document.getElementById('score').value = '';
        document.getElementById('round').value = '';
    }

    function setInputValues(data) {
        document.getElementById('player').value = data.player;
        document.getElementById('score').value = data.score;
        document.getElementById('round').value = data.round;
    }

    function isFormValid() {
        const player = document.getElementById('player').value.trim();
        const score = document.getElementById('score').value.trim();
        const round = document.getElementById('round').value.trim();

        return player && score && round;
    }
}
