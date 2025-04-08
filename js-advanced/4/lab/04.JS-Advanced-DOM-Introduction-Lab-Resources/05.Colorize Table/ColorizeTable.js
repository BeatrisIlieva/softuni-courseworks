function colorize() {
    const tableEvenRowsElements = document.querySelectorAll('table tr:nth-child(even)');
    const tableEvenRowsElementsArray = Array.from(tableEvenRowsElements);

    for (let row of tableEvenRowsElementsArray) {
        row.style.backgroundColor = 'teal';
    }
}
