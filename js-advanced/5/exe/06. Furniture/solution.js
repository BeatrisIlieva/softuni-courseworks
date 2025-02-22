function solve() {
    const inputTextareaElements = document.querySelectorAll('textarea');
    const inputTextareaElement = inputTextareaElements[0];
    const outputTextareaElement = inputTextareaElements[1];

    const buttonElements = document.querySelectorAll('button');
    const generateButtonElement = buttonElements[0];
    const buyButtonElement = buttonElements[1];

    const tableBodyElement = document.querySelector('table tbody');

    generateButtonElement.addEventListener('click', e =>
        generateHandler(e, inputTextareaElement, tableBodyElement)
    );

    buyButtonElement.addEventListener('click', e => buyHandler(e, outputTextareaElement));

    function createFurniture(name, price, decFactor) {
        return { name, price, decFactor };
    }

    function buyHandler(e, outputTextareaElement) {
        const furnitureArray = [];

        const checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');

        if (checkedCheckboxes.length <= 0) {
            return;
        }

        checkedCheckboxes.forEach(checkbox => {
            const parentElement = checkbox.closest('tr');

            const name = parentElement.querySelector('td:nth-child(2) p').textContent;
            const price = Number(parentElement.querySelector('td:nth-child(3) p').textContent);
            const decFactor = Number(parentElement.querySelector('td:nth-child(4) p').textContent);

            furnitureArray.push(createFurniture(name, price, decFactor));
        });

        let totalPrice = 0;
        let furnitureList = [];
        let totalDecFactor = 0;

        furnitureArray.forEach(furniture => {
            totalPrice += furniture.price;
            furnitureList.push(furniture.name);
            totalDecFactor += furniture.decFactor;
        });

        const boughtFurnitureLine = `Bought furniture: ${furnitureList.join(', ')}\n`;
        const totalPriceLine = `Total price: ${totalPrice.toFixed(2)}\n`;

        const averageDecFactor = totalDecFactor / furnitureList.length;
        const averageDecFactorLine = `Average decoration factor: ${averageDecFactor}`;

        let result = '';
        result += boughtFurnitureLine;
        result += totalPriceLine;
        result += averageDecFactorLine;

        outputTextareaElement.value = result;
    }

    function generateHandler(e, inputTextareaElement, tableBodyElement) {
        const furnitureData = JSON.parse(inputTextareaElement.value);

        furnitureData.forEach(furniture => {
            const { name, img, price, decFactor } = furniture;

            const tableRowElement = document.createElement('tr');

            const imgElement = createTableDataElement(createImageElement(img));
            const nameElement = createTableDataElement(createBlockElement('p', name));
            const priceElement = createTableDataElement(createBlockElement('p', price));
            const decFactorElement = createTableDataElement(createBlockElement('p', decFactor));
            const inputElement = createTableDataElement(createInputElement('checkbox'));

            tableRowElement.append(
                imgElement,
                nameElement,
                priceElement,
                decFactorElement,
                inputElement
            );

            tableBodyElement.append(tableRowElement);
        });
    }

    function createTableDataElement(childElement) {
        const tableDataElement = document.createElement('td');
        tableDataElement.append(childElement);

        return tableDataElement;
    }

    function createBlockElement(tagName, content) {
        const blockElement = document.createElement(tagName);
        blockElement.textContent = content;

        return blockElement;
    }

    function createImageElement(content) {
        const imageElement = document.createElement('img');
        imageElement.src = content;

        return imageElement;
    }

    function createInputElement(type) {
        const inputElement = document.createElement('input');
        inputElement.type = type;

        return inputElement;
    }
}
