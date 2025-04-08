function generateReport() {
    const checkboxElements = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const outputElement = document.getElementById('output');
    const rowElementsCount = Array.from(document.querySelectorAll('table tbody tr')).length;

    const result = [];

    for (let i = 0; i < rowElementsCount; i++) {
        let elementObj = {};
        let isEmpty = true;

        for (let j = 0; j < checkboxElements.length; j++) {
            const checkbox = checkboxElements[j];

            if (checkbox.checked) {
                isEmpty = false;
                const propName = checkbox.name;

                const currentRow = document.querySelector(`table tbody tr:nth-child(${i + 1}`);

                const tableDataElements = Array.from(
                    currentRow.querySelectorAll(`td:nth-child(${j + 1})`)
                );

                for (element of tableDataElements) {
                    elementObj[propName] = element.textContent;
                }
            }
        }

        if (!isEmpty) {
            result.push(elementObj);
        }
    }

    outputElement.value = JSON.stringify(result, null, 2);
}
