function attachEvents() {
    const locationInputElement = document.getElementById('location');
    const submitButtonElement = document.getElementById('submit');
    const currentElement = document.getElementById('current');
    const upcomingElement = document.getElementById('upcoming');
    const forecastElement = document.getElementById('forecast');

    submitButtonElement.addEventListener('click', submitHandler);

    const conditionSymbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    };

    function submitHandler(e) {
        e.preventDefault();

        forecastElement.style.display = 'block';

        fetch(' http://localhost:3030/jsonstore/forecaster/locations')
            .then(response => response.json())
            .then(result => {
                const locationCode = findLocationCode(result);

                return Promise.all([
                    fetch(
                        `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`
                    ),
                    fetch(
                        `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`
                    )
                ]);
            })
            .then(responses => {
                return Promise.all(
                    responses.map(item => item.json())
                );
            })
            .then(([today, upcoming]) => {
                const todayForecast = createTodayElement(today);

                currentElement.appendChild(todayForecast);

                const upcomingForecast =
                    createUpcomingElement(upcoming);

                upcomingElement.appendChild(upcomingForecast);
            })
            .catch(err => (forecastElement.textContent = 'Error'));

        function createTodayElement(data) {
            const conditionSymbolElement =
                document.createElement('span');
            conditionSymbolElement.classList.add(
                'condition',
                'symbol'
            );
            conditionSymbolElement.textContent =
                conditionSymbols[data.forecast.condition];

            const firstSpanElement = createForecastDataSpan(
                data.name
            );
            const secondSpanElement = createForecastDataSpan(
                `${data.forecast.low}°/${data.forecast.high}°`
            );
            const thirdSpanElement = createForecastDataSpan(
                data.forecast.condition
            );

            const conditionSpanElement =
                document.createElement('span');
            conditionSpanElement.classList.add('condition');

            conditionSpanElement.appendChild(firstSpanElement);
            conditionSpanElement.appendChild(secondSpanElement);
            conditionSpanElement.appendChild(thirdSpanElement);

            const forecastsElement = document.createElement('div');
            forecastsElement.classList.add('forecasts');
            forecastsElement.appendChild(conditionSymbolElement);
            forecastsElement.appendChild(conditionSpanElement);

            return forecastsElement;
        }

        function createUpcomingElement(data) {
            const forecastInfoElement = document.createElement('div');
            forecastInfoElement.classList.add('forecast-info');

            data.forecast.forEach(element => {
                const symbolElement = document.createElement('span');
                symbolElement.classList.add('symbol');
                symbolElement.textContent =
                    conditionSymbols[element.condition];

                const firstSpanElement = createForecastDataSpan(
                    `${element.low}°/${element.high}°`
                );
                const secondSpanElement = createForecastDataSpan(
                    element.condition
                );

                const upcomingSpanElement =
                    document.createElement('span');
                upcomingSpanElement.classList.add('upcoming');

                upcomingSpanElement.appendChild(symbolElement);

                upcomingSpanElement.appendChild(firstSpanElement);

                upcomingSpanElement.appendChild(secondSpanElement);

                forecastInfoElement.appendChild(upcomingSpanElement);
            });

            return forecastInfoElement;
        }

        function findLocationCode(data) {
            const locationName = locationInputElement.value;
            const locationObj = data.find(
                item => item.name === locationName
            );

            return locationObj.code;
        }

        function createForecastDataSpan(content) {
            const spanElement = document.createElement('span');
            spanElement.classList.add('forecast-data');
            spanElement.textContent = content;

            return spanElement;
        }
    }
}

attachEvents();
