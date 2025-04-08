function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';

    const locationInputElement = document.getElementById('location');
    const submitButtonElement = document.getElementById('submit');
    const currentElement = document.getElementById('current');
    const upcomingElement = document.getElementById('upcoming');
    const forecastElement = document.getElementById('forecast');

    submitButtonElement.addEventListener('click', () => {
        forecastElement.style.display = 'block';

        fetch(`${baseUrl}/locations`)
            .then(response => response.json())
            .then(result => {
                const userInput = locationInputElement.value;
                const { code } = result.find(location => location.name === userInput);

                return Promise.all([
                    fetch(`${baseUrl}/today/${code}`),
                    fetch(`${baseUrl}/upcoming/${code}`),
                ]);
            })
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            })
            .then(([today, upcoming]) => {
                const todayBlock = createTodayBlock(today);
                currentElement.appendChild(todayBlock);

                const upcomingBlock = createUpcomingBlock(upcoming);
                upcomingElement.appendChild(upcomingBlock);
            })
            .catch(error => console.log(error));
    });
}

attachEvents();

function createTodayBlock(data) {
    const symbolSpanElementContent = getSymbol(data.forecast.condition);
    const symbolSpanElement = createElementWithTextContent(
        'span',
        ['condition', 'symbol'],
        symbolSpanElementContent
    );

    const firstForecastDataSpanElementContent = data.name;
    const firstForecastDataSpanElement = createElementWithTextContent(
        'span',
        ['forecast-data'],
        firstForecastDataSpanElementContent
    );

    const degreeSymbol = getSymbol('Degrees');

    const secondForecastDataSpanElementContent = `${data.forecast.low}${degreeSymbol}/${data.forecast.high}${degreeSymbol}`;
    const secondForecastDataSpanElement = createElementWithTextContent(
        'span',
        ['forecast-data'],
        secondForecastDataSpanElementContent
    );

    const thirdForecastDataSpanElementContent = data.forecast.condition;
    const thirdForecastDataSpanElement = createElementWithTextContent(
        'span',
        ['forecast-data'],
        thirdForecastDataSpanElementContent
    );

    const conditionSpanElement = createElement('span', ['condition']);
    conditionSpanElement.appendChild(firstForecastDataSpanElement);
    conditionSpanElement.appendChild(secondForecastDataSpanElement);
    conditionSpanElement.appendChild(thirdForecastDataSpanElement);

    const divElement = createElement('div', ['forecasts']);
    divElement.appendChild(symbolSpanElement);
    divElement.appendChild(conditionSpanElement);

    return divElement;
}

function createUpcomingBlock(data) {
    const forecasts = data.forecast;

    const forecastInfoDivElement = createElement('div', ['forecast-info']);

    for (let forecast of forecasts) {
        const symbolSpanElementContent = getSymbol(forecast.condition);
        const symbolSpanElement = createElementWithTextContent(
            'span',
            ['symbol'],
            symbolSpanElementContent
        );

        const degreeSymbol = getSymbol('Degrees');

        const forecastDataSpanContent = `${forecast.low}${degreeSymbol}/${forecast.high}${degreeSymbol}`;
        const forecastDataSpan = createElementWithTextContent(
            'span',
            ['forecast-data'],
            forecastDataSpanContent
        );

        const forecastConditionSpanContent = forecast.condition;
        const forecastConditionSpanElement = createElementWithTextContent(
            'span',
            ['forecast-data'],
            forecastConditionSpanContent
        );

        const upcomingSpanElement = createElement('span', ['upcoming']);
        upcomingSpanElement.appendChild(symbolSpanElement);
        upcomingSpanElement.appendChild(forecastDataSpan);
        upcomingSpanElement.appendChild(forecastConditionSpanElement);

        forecastInfoDivElement.appendChild(upcomingSpanElement);
    }

    return forecastInfoDivElement;
}

function createElementWithTextContent(tagName, classNames, content) {
    const element = createElement(tagName, classNames);
    element.textContent = content;

    return element;
}

function createElement(tagName, classNames) {
    const element = document.createElement(tagName);

    for (let className of classNames) {
        element.classList.add(className);
    }

    return element;
}

function getSymbol(name) {
    const weatherSymbol = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°',
    };

    return weatherSymbol[name];
}
