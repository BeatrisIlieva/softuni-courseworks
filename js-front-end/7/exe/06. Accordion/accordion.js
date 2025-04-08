function solution() {
    const baseUrl =
        'http://localhost:3030/jsonstore/advanced/articles';

    const mainElement = document.querySelector('#main');

    fetch(`${baseUrl}/list`)
        .then(response => response.json())
        .then(result => generateContent(result))
        .catch(err => console.log(err.message));

    function generateContent(data) {
        data.forEach(item => {
            const spanElement = document.createElement('span');
            spanElement.textContent = item.title;

            const buttonElement = document.createElement('button');
            buttonElement.classList.add('button');
            buttonElement.id = item._id;
            buttonElement.textContent = 'More';

            const divElement = document.createElement('div');
            divElement.classList.add('head');
            divElement.appendChild(spanElement);
            divElement.appendChild(buttonElement);

            const paragraphElement = document.createElement('p');

            paragraphElement.textContent = '';

            const extraContentElement = document.createElement('div');
            extraContentElement.classList.add('extra');

            extraContentElement.appendChild(paragraphElement);

            buttonElement.addEventListener('click', () => {
                const isDisplayed =
                    buttonElement.textContent === 'Less';

                const contentIsLoaded =
                    paragraphElement.textContent.trim() !== '';

                if (!contentIsLoaded) {
                    fetch(`${baseUrl}/details/${item._id}`)
                        .then(response => response.json())
                        .then(result => {
                            paragraphElement.textContent =
                                result.content;
                        })
                        .catch(err => console.log(err.message));
                }

                extraContentElement.style.display = isDisplayed
                    ? 'none'
                    : 'block';

                buttonElement.textContent = isDisplayed
                    ? 'More'
                    : 'Less';
            });

            const accordionElement = document.createElement('div');
            accordionElement.classList.add('accordion');

            accordionElement.appendChild(divElement);
            accordionElement.appendChild(extraContentElement);

            mainElement.appendChild(accordionElement);
        });
    }
}

solution();
