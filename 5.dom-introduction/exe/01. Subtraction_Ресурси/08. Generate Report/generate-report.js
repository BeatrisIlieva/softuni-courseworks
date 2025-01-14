function solve() {
    const tHeaderElements = document.querySelectorAll('table thead tr th');
    const tBodyElements = document.querySelectorAll('table tbody tr');
    const outputElement = document.getElementById('output');

    const checkedInputElements = [...tHeaderElements]
        .map((cell, i) => {
            const inputElement = cell.querySelector('input[type="checkbox"]');

            return { element: inputElement, name: inputElement.name, index: i };
        })
        .filter((object) => object.element.checked);
    console.log(checkedInputElements);

    const result = [...tBodyElements].map((row) => {
        const dataElements = row.querySelectorAll('td');

        return checkedInputElements.reduce((acc, curr) => {
            acc[curr.name] = dataElements[curr.index].textContent;
            return acc;
        }, {});
    });

    outputElement.textContent = JSON.stringify(result);
}
