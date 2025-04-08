function search() {
    const inputElement = document.getElementById('searchText');
    const resultElement = document.getElementById('result');
    const listItemElements = document.querySelectorAll('#towns li');

    const input = inputElement.value.toLowerCase();
    let count = 0;

    listItemElements.forEach((listElement) => {
        const listElementText = listElement.textContent.toLowerCase();

        if (listElementText.includes(input)) {
            count++;

            listElement.style.textDecoration = 'underline';
            listElement.style.fontWeight = 'bold';
        }
    });

    resultElement.textContent = `${count} matches found`;
}
