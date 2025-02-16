document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const formElement = document.getElementById('input');

    function createTDElement(element) {
        const tdElement = document.createElement('td');
        tdElement.append(element);

        return tdElement;
    }

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const tableBodyElement = document.querySelector('#shop table tbody');
        const textAreaElement = document.querySelector('#exercise #input textarea');
        const furnitureArray = JSON.parse(textAreaElement.value);

        const result = furnitureArray.map((furniture) => {
            const trElement = document.createElement('tr');

            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', furniture.img);
            trElement.append(createTDElement(imgElement));

            const pNameElement = document.createElement('p');
            pNameElement.textContent = furniture.name;
            trElement.append(createTDElement(pNameElement));

            const pPriceElement = document.createElement('p');
            pPriceElement.textContent = furniture.price;
            trElement.append(createTDElement(pPriceElement));

            const pFactorElement = document.createElement('p');
            pFactorElement.textContent = furniture.decFactor;
            trElement.append(createTDElement(pFactorElement));

            const checkboxElement = document.createElement('input');
            checkboxElement.setAttribute('type', 'checkbox');
            trElement.append(createTDElement(checkboxElement));

            return trElement;
        });

        tableBodyElement.append(...result);
    });

    const shopFormElement = document.getElementById('shop');

    shopFormElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const furnitureNames = [];
        let totalPrice = 0;
        let totalAverageFactor = 0;

        const checkedInputElements = Array.from(
            e.target.querySelectorAll('tbody tr td input:checked')
        );

        checkedInputElements.forEach((checkedInput) => {
            const tableRowElement = checkedInput.parentElement.parentElement;

            const furnitureName = tableRowElement.querySelector('td:nth-child(2)').textContent;
            furnitureNames.push(furnitureName);

            const furniturePrice = tableRowElement.querySelector('td:nth-child(3)').textContent;
            totalPrice += Number(furniturePrice);

            const furnitureDecFactor = tableRowElement.querySelector('td:nth-child(4)').textContent;
            totalAverageFactor += Number(furnitureDecFactor);
        });

        const textAreaElement = shopFormElement.querySelector('textarea');

        textAreaElement.value = `Bought furniture: ${furnitureNames.join(', ')}\n`;
        textAreaElement.value += `Total price: ${totalPrice}\n`;
        const averageDecFactor = totalAverageFactor / furnitureNames.length;
        textAreaElement.value += `Average decoration factor: ${averageDecFactor}`;
    });
}
