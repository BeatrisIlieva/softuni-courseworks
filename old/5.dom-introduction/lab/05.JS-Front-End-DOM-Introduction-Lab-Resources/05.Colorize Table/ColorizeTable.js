function colorize() {
    const evenRowElements = Array.from(document.querySelectorAll('table tr:nth-child(even)'));

    for (let rowElement of evenRowElements) {
        rowElement.style.backgroundColor = 'teal';
    }
}
