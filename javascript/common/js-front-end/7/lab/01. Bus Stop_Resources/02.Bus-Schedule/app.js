function solve() {
    const departButtonElement = document.getElementById('depart');
    const arriveButtonElement = document.getElementById('arrive');
    const infoElement = document.querySelector('#info span');

    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';
    let nextId = 'depot';
    let nextName = '';

    function depart() {
        fetch(`${baseUrl}/${nextId}`)
            .then(response => response.json())
            .then(data => displayContent(data));
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${nextName}`;

        departButtonElement.removeAttribute('disabled');
        arriveButtonElement.setAttribute('disabled', 'disabled');
    }

    function displayContent(data) {
        infoElement.textContent = data.name;
        nextId = data.next;
        nextName = data.name;

        departButtonElement.setAttribute('disabled', 'disabled');
        arriveButtonElement.removeAttribute('disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
