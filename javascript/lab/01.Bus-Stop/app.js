function getInfo() {
    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';

    const stopIdInputElement = document.getElementById('stopId');
    const stopNameElement = document.getElementById('stopName');
    const busesUlElement = document.getElementById('buses');

    const stopId = stopIdInputElement.value;

    fetch(`${baseUrl}/${stopId}`)
        .then(response => response.json())
        .then(result => {
            stopNameElement.textContent = result.name;

            busesUlElement.appendChild(createFragment(result));
        })
        .catch(() => (stopNameElement.textContent = 'Error'))
        .finally((busesUlElement.innerHTML = ''));

    function createFragment(data) {
        const fragment = document.createDocumentFragment();

        const busesData = data.buses;

        for (const busId in busesData) {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${busesData[busId]} minutes`;

            fragment.appendChild(liElement);
        }

        return fragment;
    }
}
