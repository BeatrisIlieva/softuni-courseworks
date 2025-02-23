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

            const checkboxElement = createInputElement('checkbox');

            const trElement = createBlockElement('tr');

            trElement.append(
                tdForImgElement,
                tdForNameElement,
                tdForPriceElement,
                tdForDecFactorElement,
                checkboxElement
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
}
