function getInfo() {
    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';

    const stopIdElement = document.getElementById('stopId');
    const stopNameElement = document.getElementById('stopName');
    const busesElement = document.getElementById('buses');

    const stopId = stopIdElement.value;
    fetch(`${baseUrl}/${stopId}`)
        .then((response) => response.json())
        .then((result) => {
            return createElement(result, stopNameElement, busesElement);
        })
        .catch((error) => console.log(error));
}

function renderBusInfo(data, stopNameElement, busesElement) {
    stopNameElement.textContent = data.name;
    const buses = data.buses;

    for (const busId in buses) {
        const liElement = document.createElement('li');
        liElement.textContent = `Bus ${busId} arrives in ${buses[busId]} minutes`;

        busesElement.appendChild(liElement);
    }
}
