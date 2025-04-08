function colorize() {
    const evenRows = document.querySelectorAll('tbody tr:nth-child(even)');
    evenRows.forEach(row => (row.style.backgroundColor = 'teal'));
}
