function sumTable() {
    const tdElements = document.querySelectorAll('tbody tr td:nth-child(2):not(#sum)');
    const resultElement = document.getElementById('sum');

    const sum = [...tdElements].reduce((acc, curr) => acc + Number(curr.textContent), 0);

    resultElement.textContent = sum;
}
