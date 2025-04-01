function attachEvents() {
    const conditionSymbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    };

    const baseUrl =
        'http://localhost:3030/jsonstore/forecaster/locations';

    const submitButtonElement = document.getElementById('submit');
    const locationInputElement = document.getElementById('location');
    const forecastDivElement = document.getElementById('forecast');
    const currentElement = document.getElementById('current');
    const upcomingElement = document.getElementById('upcoming');

    submitButtonElement.addEventListener('click', submitHandler);

    async function submitHandler(e) {
        // solution with async/await
        forecastDivElement.style.display = 'block';

        try {
            const response = await fetch(baseUrl);
            const result = await response.json();

            const requestedLocation = locationInputElement.value;

            const locationObj = result.find(
                element => element.name == requestedLocation
            );
            const code = locationObj.code;

            const todayDataResponse = await fetch(
                `http://localhost:3030/jsonstore/forecaster/today/${code}`
            );
            const todayData = await todayDataResponse.json();

            const upcomingDataResponse = await fetch(
                `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
            );

            const upcomingData = await upcomingDataResponse.json();

            currentElement.appendChild(
                createForecastsDivElement(todayData)
            );
            upcomingElement.appendChild(
                createForecastInfoDivElement(upcomingData)
            );
        } catch (err) {
            forecastDivElement.textContent = 'Error';
            console.log(err);
        }

        // solution with promises
        // fetch(baseUrl)
        //     .then(response => response.json())
        //     .then(result => {
        //         const requestedLocation = locationInputElement.value;
        //         const locationObj = result.find(
        //             element => (element.name = requestedLocation)
        //         );
        //         const code = locationObj.code;

        //         Promise.all([
        //             fetch(
        //                 `http://localhost:3030/jsonstore/forecaster/today/${code}`
        //             ),
        //             fetch(
        //                 `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
        //             )
        //         ])
        //             .then(responses =>
        //                 Promise.all(responses.map(res => res.json()))
        //             )
        //             .then(data => {
        //                 const [today, upcoming] = data;

        //                 currentElement.appendChild(
        //                     createForecastsDivElement(today)
        //                 );
        //                 upcomingElement.appendChild(
        //                     createForecastInfoDivElement(upcoming)
        //                 );
        //             });
        //     })
        //     .catch(() => (forecastDivElement.textContent = 'Error'))
        //     .finally(
        //         () => (forecastDivElement.style.display = 'block')
        //     );
    }

    function createForecastsDivElement(data) {
        const conditionSymbolSpanElement =
            document.createElement('span');
        conditionSymbolSpanElement.classList.add(
            'condition',
            'symbol'
        );
        conditionSymbolSpanElement.textContent =
            conditionSymbols[data.forecast.condition];

        const firstForecastDataSpan = createForecastDataSpan(
            data.name
        );
        const secondForecastDataSpan = createForecastDataSpan(
            `${data.forecast.low}${conditionSymbols.Degrees}/${data.forecast.high}${conditionSymbols.Degrees}`
        );
        const thirdForecastDataSpan = createForecastDataSpan(
            data.forecast.condition
        );

        const conditionSpanElement = document.createElement('span');
        conditionSpanElement.classList.add('condition');

        conditionSpanElement.appendChild(firstForecastDataSpan);
        conditionSpanElement.appendChild(secondForecastDataSpan);
        conditionSpanElement.appendChild(thirdForecastDataSpan);

        const forecastsDivElement = document.createElement('div');
        forecastsDivElement.classList.add('forecasts');
        forecastsDivElement.appendChild(conditionSymbolSpanElement);
        forecastsDivElement.appendChild(conditionSpanElement);

        return forecastsDivElement;
    }

    function createForecastInfoDivElement(data) {
        const fragment = document.createDocumentFragment();

        const forecasts = data.forecast;

        forecasts.forEach(forecast => {
            const symbolSpanElement = document.createElement('span');
            symbolSpanElement.classList.add('symbol');
            symbolSpanElement.textContent =
                conditionSymbols[forecast.condition];

            const firstForecastDataSpan = createForecastDataSpan(
                `${forecast.low}${conditionSymbols.Degrees}/${forecast.high}${conditionSymbols.Degrees}`
            );

            const secondForecastDataSpan = createForecastDataSpan(
                forecast.condition
            );

            const upcomingSpanElement =
                document.createElement('span');
            upcomingSpanElement.classList.add('upcoming');

            upcomingSpanElement.appendChild(symbolSpanElement);
            upcomingSpanElement.appendChild(firstForecastDataSpan);
            upcomingSpanElement.appendChild(secondForecastDataSpan);

            fragment.appendChild(upcomingSpanElement);
        });

        const forecastInfoDivElement = document.createElement('div');
        forecastInfoDivElement.classList.add('forecast-info');
        forecastInfoDivElement.appendChild(fragment);

        return forecastInfoDivElement;
    }

    function createForecastDataSpan(content) {
        const spanElement = document.createElement('span');
        spanElement.classList.add('forecast-data');
        spanElement.textContent = content;

        return spanElement;
    }
}

attachEvents();
