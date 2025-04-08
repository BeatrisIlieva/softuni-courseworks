function solve() {
    const searchInputElement = document.getElementById('searchField');
    const trElements = document.querySelectorAll('tbody tr');

    const searchInput = searchInputElement.value.toLowerCase().trim();

    if (searchInput === '') {
        return;
    }

    searchInputElement.value = '';

    for (let trElement of trElements) {
        const tdElements = trElement.querySelectorAll('td');
        trElement.classList.remove('select');

        let isSelected = false;

        for (let tdElement of tdElements) {
            if (tdElement.textContent.toLowerCase().trim().includes(searchInput)) {
                isSelected = true;
                break;
            }
        }
        if (isSelected) {
            trElement.classList.add('select');
        }
    }
}
