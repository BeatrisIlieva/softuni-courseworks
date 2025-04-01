function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';

    const departButtonElement = document.getElementById('depart');
    const arriveButtonElement = document.getElementById('arrive');
    const infoElement = document.querySelector('.info');

    let nextStopId = 'depot';
    let nextStopName = '';

    function depart() {
        fetch(`${baseUrl}/${nextStopId}`)
            .then(response => response.json())
            .then(result => departHandler(result))
            .catch(() => (infoElement.textContent = 'Error'));
    }

    function arrive() {
        toggleButtons(departButtonElement, arriveButtonElement);
        infoElement.textContent = `Arriving at ${nextStopName}`;
    }

    function departHandler(data) {
        nextStopId = data.next;
        nextStopName = data.name;

        toggleButtons(arriveButtonElement, departButtonElement);
        infoElement.textContent = `Next stop ${nextStopName}`;
    }

    function toggleButtons(buttonToEnable, buttonToDisable) {
        buttonToDisable.setAttribute('disabled', 'disabled');
        buttonToEnable.removeAttribute('disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
