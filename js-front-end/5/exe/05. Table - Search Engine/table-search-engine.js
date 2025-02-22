function solve() {
    const tableRowElements = document.querySelectorAll('tbody tr');
    const inputElement = document.getElementById('searchField');
    const input = inputElement.value;

    if (input === '') return;

    tableRowElements.forEach(row => {
        row.classList.remove('select');

        const tdElements = [...row.children];

        const isMatched = tdElements.some(td => {
            const content = td.textContent.toLowerCase();

            return content.includes(input.toLowerCase());
        });

        isMatched && row.classList.add('select');
    });

    inputElement.value = '';
    inputElement.focus();
}
