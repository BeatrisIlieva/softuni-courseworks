function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';

    const locationInputElement = document.getElementById('location');
    const submitButtonElement = document.getElementById('submit');
    const forecastElement = document.getElementById('forecast');
    const currentElement = document.getElementById('current');

    const weatherSymbol = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°',
    };

    submitButtonElement.addEventListener('click', () => {
        fetch(`${baseUrl}/locations`)
            .then(response => response.json())
            .then(result => {
                const { code } = result.find(
                    location => location.name === locationInputElement.value
                );

                return Promise.all([
                    fetch(`${baseUrl}/today/${code}`),
                    fetch(`${baseUrl}/upcoming/${code}`),
                ])
            })
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([today, upcoming]) => {
                console.log(today, upcoming);
                forecastElement.style.display = 'block';

                const forecastsDivElement = document.createElement('div');
                forecastsDivElement.classList.add('forecasts');

                const symbolSpanElement = document.createElement('span');
                symbolSpanElement.classList.add('condition');
                symbolSpanElement.classList.add('symbol');
                symbolSpanElement.textContent = weatherSymbol[today.forecast.condition];

                const conditionSpanElement = document.createElement('span');
                conditionSpanElement.classList.add('condition');

                conditionSpanElement.appendChild(createSpan(today.name));
                conditionSpanElement.appendChild(createSpan(`${today.forecast.low}/${today.forecast.high}`));
                conditionSpanElement.appendChild(createSpan(today.condition));

                forecastsDivElement.append(symbolSpanElement);
                forecastsDivElement.append(conditionSpanElement);

                currentElement.append(forecastsDivElement);
            })
            .catch(error => console.log(error));
    });
}

attachEvents();

function createSpan(value) {
    const spanElement = document.createElement('span');
    spanElement.classList.add('forecast-data');
    spanElement.textContent = value;

    return spanElement;
}
