function solve() {
    const townItems = document.querySelectorAll('#towns li');
    const inputElement = document.getElementById('searchText');
    const resultElement = document.getElementById('result');

    const input = inputElement.value;
    let count = 0;

    townItems.forEach(item => {
        const content = item.textContent;
        const isMatched = content.includes(input);

        if (isMatched) count++;

        item.style.textDecoration = isMatched ? 'underline' : 'none';
        item.style.fontWeight = isMatched ? 'bold' : 'normal';
    });

    resultElement.textContent = `${count} matches found`;

    inputElement.value = '';
    inputElement.focus();
}
