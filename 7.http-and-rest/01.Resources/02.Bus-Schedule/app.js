function solve() {
    // const infoElement = document.querySelector('#info .info');
    // const departInputElement = document.getElementById('depart');
    // const arriveInputElement = document.getElementById('arrive');

    let currentStop = 'depot';
    let nextStop = 'depot';

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStop}`)
            .then(response => response.json())
            .then(result => {
                const infoElement = document.querySelector('#info .info');
                const departInputElement = document.getElementById('depart');
                const arriveInputElement = document.getElementById('arrive');
                nextStop = result.next;

                infoElement.textContent = `Next stop ${result.name}`;
                toggleButton(departInputElement);
                toggleButton(arriveInputElement);
            })
            .catch(() => {
                infoElement.textContent = 'Error';

                toggleButton(departInputElement);
            });
    }

    async function arrive() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStop}`)
            .then(response => response.json())
            .then(result => {
                const infoElement = document.querySelector('#info .info');
                const departInputElement = document.getElementById('depart');
                const arriveInputElement = document.getElementById('arrive');
                currentStop = nextStop;

                infoElement.textContent = `Arriving at ${result.name}`;

                toggleButton(departInputElement);
                toggleButton(arriveInputElement);
            })
            .catch(() => {
                infoElement.textContent = 'Error';

                toggleButton(arriveInputElement);
            });
    }

    function toggleButton(button) {
        button.disabled = !button.disabled;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
