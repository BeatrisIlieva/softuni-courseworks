function sumTable() {
    const tdElements = document.querySelectorAll('table tr td:nth-child(2):not(#sum)');
    const sumElement = document.getElementById('sum');

    const tdElementsAsArray = Array.from(tdElements);

    const sum = tdElementsAsArray.reduce((acc, curr) => acc + Number(curr.textContent), 0);

    sumElement.textContent = sum;
}
