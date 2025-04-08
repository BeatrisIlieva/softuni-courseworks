function getInfo() {
    const inputElement = document.getElementById('stopId');
    const busesElement = document.getElementById('buses');
    const stopNameElement = document.getElementById('stopName');

    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';

    const busId = inputElement.value;

    fetch(`${baseUrl}/${busId}`)
        .then(response => response.json())
        .then(result => visualizeData(result))
        .catch(err => errorHandler());

    function visualizeData(data) {
        stopNameElement.textContent = data.name;

        const busesFragment = document.createDocumentFragment();

        Object.keys(data.buses).forEach(key => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`;

            busesFragment.appendChild(liElement);
        });

        busesElement.appendChild(busesFragment);
    }

    function errorHandler(e) {
        stopNameElement.textContent = 'Error';
    }
}
