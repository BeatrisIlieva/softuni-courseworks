function sumTable() {
    const tableElement = Array.from(
        document.querySelectorAll('table tr td:nth-child(2):not(#sum)')
    );
    const sumElement = document.getElementById('sum');

    sumElement.textContent = tableElement.reduce((acc, curr) => acc + Number(curr.textContent), 0);
}
