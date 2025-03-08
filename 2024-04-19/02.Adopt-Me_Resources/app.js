window.addEventListener('load', solve);

function solve() {
    const adoptButtonElement = document.getElementById('adopt-btn');
    const adoptionInfoElement =
        document.getElementById('adoption-info');
    const adoptedListElement =
        document.getElementById('adopted-list');
    const typeInputElement = document.getElementById('type');
    const ageInputElement = document.getElementById('age');
    const selectMenuElement = document.getElementById('gender');

    adoptButtonElement.addEventListener('click', submitHandler);

    function submitHandler(e) {
        e.preventDefault();

        const typeInput = typeInputElement.value;
        const ageInput = ageInputElement.value;
        const selectMenu =
            selectMenuElement.querySelector('option:checked').value;

        const inputs = [typeInput, ageInput, selectMenu];

        if (inputs.some(input => input.trim() == '')) {
            return;
        }

        const paragraphTitles = ['Pet:', 'Age:', 'Gender:'];

        const paragraphs = inputs.map((input, index) => {
            return createParagraph(paragraphTitles[index], input);
        });

        const articleElement = document.createElement('article');
        articleElement.appendChild(paragraphs[0]);
        articleElement.appendChild(paragraphs[2]);
        articleElement.appendChild(paragraphs[1]);

        const buttonsData = [
            { Edit: 'edit-btn' },
            { Done: 'done-btn' }
        ];
        const buttons = buttonsData.map(data => {
            const [content, className] = Object.entries(data)[0];

            return createButton(content, className);
        });

        buttons[0].addEventListener('click', editHandler);
        buttons[1].addEventListener('click', doneHandler);

        const buttonsDivElement = document.createElement('div');
        buttonsDivElement.classList.add('buttons');
        buttonsDivElement.appendChild(buttons[0]);
        buttonsDivElement.appendChild(buttons[1]);

        const liElement = document.createElement('li');
        liElement.appendChild(articleElement);
        liElement.appendChild(buttonsDivElement);

        adoptionInfoElement.appendChild(liElement);

        typeInputElement.value = '';
        ageInputElement.value = '';
        selectMenuElement.value = '';
    }

    function createParagraph(title, content) {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = `${title}${content}`;

        return paragraphElement;
    }

    function createButton(content, className) {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = content;
        buttonElement.classList.add(className);

        return buttonElement;
    }

    function editHandler(e) {
        const inputs = [
            typeInputElement.value,
            ageInputElement.value,
            selectMenuElement.value
        ];

        if (inputs.some(input => input.trim() != '')) {
            return;
        }

        const adoptionInfoLiElement =
            adoptionInfoElement.querySelector('li');

        const type = adoptionInfoLiElement
            .querySelector('article p:nth-child(1)')
            .textContent.split('Pet:')[1];

        const select = adoptionInfoLiElement
            .querySelector('article p:nth-child(2)')
            .textContent.split('Gender:')[1];

        const age = adoptionInfoLiElement
            .querySelector('p:nth-child(3)')
            .textContent.split('Age:')[1];

        typeInputElement.value = type;
        ageInputElement.value = age;
        selectMenuElement.value = select;

        adoptionInfoLiElement.remove();
    }

    function doneHandler(e) {
        const adoptionInfoLiElement =
            adoptionInfoElement.querySelector('li');

        const buttonsDivElement =
            adoptionInfoLiElement.querySelector('.buttons');
        buttonsDivElement.remove();

        const clearButtonElement = document.createElement('button');
        clearButtonElement.textContent = 'Clear';
        clearButtonElement.classList.add('clear-btn');
        clearButtonElement.addEventListener('click', clearHandler);

        adoptionInfoLiElement.appendChild(clearButtonElement);

        adoptedListElement.appendChild(adoptionInfoLiElement);
    }

    function clearHandler(e) {
        const adoptedListLiElement =
            adoptedListElement.querySelector('li');

        adoptedListLiElement.remove();
    }
}
