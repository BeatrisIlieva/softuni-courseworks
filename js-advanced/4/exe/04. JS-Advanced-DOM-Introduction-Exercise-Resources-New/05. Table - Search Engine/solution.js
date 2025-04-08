function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);

    function onClick() {
        const inputElement = document.getElementById('searchField');
        let tdElements = document.querySelectorAll('tbody td');
        let trElements = document.querySelectorAll('tbody tr');

        trElements = Array.from(trElements);

        for (let element of trElements) {
            element.classList.remove('select');
        }

        tdElements = Array.from(tdElements);

        const input = inputElement.value.toLowerCase();

        for (let element of tdElements) {
            let elementContent = element.textContent.toLowerCase();
            let isMatched = elementContent.includes(input);

            let parentElement = element.parentElement;

            if (isMatched) {
                parentElement.classList.add('select');
            }
        }

        inputElement.value = '';
    }
}
