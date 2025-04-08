function solve() {
    const infoElement = document.querySelector('#info .info');
    const departInputElement = document.getElementById('depart');
    const arriveInputElement = document.getElementById('arrive');
    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';

    let [nextId, location] = ['depot', null];

    async function depart() {
        departInputElement.disabled = true;
        arriveInputElement.disabled = false;

        fetch(`${baseUrl}/${nextId}`)
            .then(response => response.json())
            .then(result => {
                location = result.name;
                nextId = result.next;

                infoElement.textContent = `Next stop ${location}`;
            })
            .catch(() => {
                infoElement.textContent = 'Error';
            });
    }

    function arrive() {
        departInputElement.disabled = false;
        arriveInputElement.disabled = true;

        infoElement.textContent = `Arriving at ${location}`;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
