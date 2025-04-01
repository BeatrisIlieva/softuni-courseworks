function solution() {
    const baseUrl =
        'http://localhost:3030/jsonstore/advanced/articles/list';
    const detailsUrl =
        'http://localhost:3030/jsonstore/advanced/articles/details';

    const mainElement = document.getElementById('main');

    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            result.forEach(item =>
                mainElement.appendChild(createAccordion(item))
            );
        });

    function createAccordion(data) {
        const spanElement = document.createElement('span');
        spanElement.textContent = data.title;

        const buttonElement = document.createElement('button');
        buttonElement.classList.add('button');
        buttonElement.id = data._id;
        buttonElement.textContent = 'More';

        buttonElement.addEventListener('click', clickHandler);

        const headElement = document.createElement('div');
        headElement.classList.add('head');
        headElement.appendChild(spanElement);
        headElement.appendChild(buttonElement);

        const accordionElement = document.createElement('div');
        accordionElement.classList.add('accordion');
        accordionElement.appendChild(headElement);

        return accordionElement;
    }

    function clickHandler(e) {
        const buttonElement = e.target;
        const accordionElement =
            buttonElement.parentElement.parentElement;

        const extraContentIsDisplayed =
            buttonElement.textContent == 'Less';

        const extraContentElement =
            accordionElement.querySelector('.extra');

        if (extraContentIsDisplayed) {
            extraContentElement.style.display = 'none';
            buttonElement.textContent = 'More';
        } else {
            if (!extraContentElement) {
                const elementId = buttonElement.id;

                fetch(`${detailsUrl}/${elementId}`)
                    .then(response => response.json())
                    .then(result => {
                        const paragraphElement =
                            document.createElement('p');
                        paragraphElement.textContent = result.content;

                        const newExtraContentElement =
                            document.createElement('div');
                        newExtraContentElement.classList.add('extra');
                        newExtraContentElement.appendChild(
                            paragraphElement
                        );

                        newExtraContentElement.style.display =
                            'block';

                        buttonElement.textContent = 'Less';

                        accordionElement.appendChild(
                            newExtraContentElement
                        );
                    });
            } else {
                extraContentElement.style.display = 'block';
                buttonElement.textContent = 'Less';
            }
        }
    }
}

solution();
