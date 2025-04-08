document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const generateButtonElement = document.querySelector('#input input[type=submit]');

    generateButtonElement.addEventListener('click', e => generateFurniture(e));

    function generateFurniture(e) {
        e.preventDefault();

        const textareaElement = document.querySelector('textarea');

        const input = JSON.parse(textareaElement.value);

        const tbodyElement = document.querySelector('tbody');

        input.forEach(furniture => {
            const { name, img, price, decFactor } = furniture;

            const tdForImgElement = createBlockElement('td');
            const imageElement = createImageElement(img);
            appendChildElement(tdForImgElement, imageElement);

            const tdForNameElement = createBlockElement('td');
            const nameElement = createBlockElement('p');
            nameElement.textContent = name;
            appendChildElement(tdForNameElement, nameElement);

            const tdForPriceElement = createBlockElement('td');
            const priceElement = createBlockElement('p');
            priceElement.textContent = price;
            appendChildElement(tdForPriceElement, priceElement);

            const tdForDecFactorElement = createBlockElement('td');
            const decFactorElement = createBlockElement('p');
            decFactorElement.textContent = decFactor;
            appendChildElement(tdForDecFactorElement, decFactorElement);

            const tdForInputElement = createBlockElement('td');
            const checkboxElement = createInputElement('checkbox');
            appendChildElement(tdForInputElement, checkboxElement);

            const trElement = createBlockElement('tr');

            trElement.append(
                tdForImgElement,
                tdForNameElement,
                tdForPriceElement,
                tdForDecFactorElement,
                tdForInputElement
            );

            tbodyElement.append(trElement);
        });
    }

    function appendChildElement(parent, child) {
        parent.append(child);
    }

    function createBlockElement(tagName) {
        return document.createElement(tagName);
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

    const buyButtonElement = document.querySelector('#shop input[type=submit]');

    buyButtonElement.addEventListener('click', e => buyFurniture(e));

    function buyFurniture(e) {
        e.preventDefault();

        const furnitureData = [];

        const checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');

        [...checkedCheckboxes].forEach(checkbox => {
            const tableRowElement = checkbox.closest('tr');

            const image = tableRowElement.querySelector('td:nth-child(1) img').src;
            const name = tableRowElement.querySelector('td:nth-child(2) p').textContent;
            const price = Number(tableRowElement.querySelector('td:nth-child(3) p').textContent);
            const decFactor = Number(
                tableRowElement.querySelector('td:nth-child(4) p').textContent
            );

            furnitureData.push({ image, name, price, decFactor });
        });

        let totalPrice = 0;
        let furnitureList = [];
        let totalDecFactor = 0;

        for (let furniture of furnitureData) {
            totalPrice += furniture.price;
            furnitureList.push(furniture.name);
            totalDecFactor += furniture.decFactor;
        }

        const averageDecFactor = totalDecFactor / furnitureList.length;

        const textareaElement = document.querySelector('#shop textarea');

        textareaElement.value += `Bought furniture: ${furnitureList.join(', ')}\n`;
        textareaElement.value += `Total price: ${totalPrice}\n`;
        textareaElement.value += `Average decoration factor: ${averageDecFactor}`;
    }
}
