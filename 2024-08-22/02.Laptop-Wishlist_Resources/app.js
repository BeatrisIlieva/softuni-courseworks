window.addEventListener('load', solve);

function solve() {
    const addButtonElement = document.getElementById('add-btn');

    const ulCheckListElement = document.getElementById('check-list');

    const clearButton = document.querySelector('.btn.clear');

    clearButton.addEventListener('click', clearHandler);

    const laptopModelInputElement =
        document.getElementById('laptop-model');
    const storageModelInputElement =
        document.getElementById('storage');
    const priceModelInputElement = document.getElementById('price');

    addButtonElement.addEventListener('click', submitHandler);

    function submitHandler(e) {
        e.preventDefault();

        let inputs = [
            laptopModelInputElement.value,
            storageModelInputElement.value,
            priceModelInputElement.value
        ];

        let isFormValid = true;

        for (const input of inputs) {
            if (!isInputValid(input)) {
                isFormValid = false;
                break;
            }
        }

        if (!isFormValid) {
            return;
        }

        addButtonElement.setAttribute('disabled', 'disabled');

        inputs = [
            laptopModelInputElement.value,
            `Memory: ${storageModelInputElement.value} TB`,
            `Price: ${priceModelInputElement.value}$`
        ];

        const paragraphElements = inputs.map(input => {
            return createElement('p', input);
        });

        const article = document.createElement('article');
        article.append(...paragraphElements);

        const editButtonElement = createElement('button', 'edit');
        editButtonElement.addEventListener('click', editHandler);
        addClassNames(editButtonElement, ['btn', 'edit']);

        const okButtonElement = createElement('button', 'ok');
        okButtonElement.addEventListener('click', okHandler);
        addClassNames(okButtonElement, ['btn', 'ok']);

        const liElement = document.createElement('li');
        liElement.classList.add('laptop-item');

        liElement.append(article, editButtonElement, okButtonElement);

        ulCheckListElement.append(liElement);

        laptopModelInputElement.value = '';
        storageModelInputElement.value = '';
        priceModelInputElement.value = '';
    }

    function isInputValid(input) {
        return input.trim() !== '';
    }

    function createElement(tagName, content) {
        const element = document.createElement(tagName);

        element.textContent = content;

        return element;
    }

    function addClassNames(element, classNames) {
        classNames.forEach(className =>
            element.classList.add(className)
        );
    }

    function editHandler(e) {
      addButtonElement.removeAttribute('disabled', 'disabled');

        const laptopItemElement =
            document.querySelector('.laptop-item');

        if (laptopModelInputElement.value !== '') {
            return;
        }

        if (storageModelInputElement.value !== '') {
            return;
        }

        if (priceModelInputElement.value !== '') {
            return;
        }

        const laptopModelElement = laptopItemElement.querySelector(
            'article p:nth-child(1)'
        );
        const laptopModel = laptopModelElement.textContent;

        const laptopMemoryElement = laptopItemElement.querySelector(
            'article p:nth-child(2)'
        );
        const laptopMemory = laptopMemoryElement.textContent
            .split('Memory: ')[1]
            .split(' TB')[0];

        const laptopPriceElement = laptopItemElement.querySelector(
            'article p:nth-child(3)'
        );
        const laptopPrice = laptopPriceElement.textContent
            .split('Price: ')[1]
            .split('$')[0];

        laptopModelInputElement.value = laptopModel;
        storageModelInputElement.value = laptopMemory;
        priceModelInputElement.value = laptopPrice;

        laptopItemElement.remove();
    }

    function okHandler(e) {
        const laptopItemElement =
            document.querySelector('.laptop-item');

        const buttons = laptopItemElement.querySelectorAll('button');

        buttons.forEach(button => button.remove());

        const laptopsListElement =
            document.getElementById('laptops-list');
        laptopsListElement.append(laptopItemElement);
    }

    function clearHandler(e) {
        const laptopItemElements =
            document.querySelectorAll('.laptop-item');

        laptopItemElements.forEach(element => element.remove());

        laptopModelInputElement.value = '';
        storageModelInputElement.value = '';
        priceModelInputElement.value = '';

        addButtonElement.removeAttribute('disabled', 'disabled');
        
    }
}
