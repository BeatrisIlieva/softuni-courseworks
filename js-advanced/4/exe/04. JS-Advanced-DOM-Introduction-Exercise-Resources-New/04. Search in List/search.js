function search() {
    let townElements = document.querySelectorAll('#towns li');
    const searchTextElement = document.getElementById('searchText');
    const resultElement = document.getElementById('result');

    const searchText = searchTextElement.value;

    townElements = Array.from(townElements);
    let count = 0;

    for (let town of townElements) {
        let townTextContent = town.textContent;
        let townFound = townTextContent.includes(searchText);

        count += townFound ? 1 : 0;

        town.style.textDecoration = townFound ? 'underline' : 'none';
        town.style.fontWeight = townFound ? 'bold' : 'normal';
    }

    searchTextElement.value = '';
    resultElement.textContent = `${count} matches found`;
}
