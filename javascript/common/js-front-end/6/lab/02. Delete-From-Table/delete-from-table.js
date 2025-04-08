function deleteByEmail() {
    const inputElement = document.querySelector('input[name=email]');
    const tdElements = document.querySelectorAll('tbody tr td:nth-child(2)');
    const resultElement = document.getElementById('result');

    const input = inputElement.value;

    let result = 'Not found.';

    tdElements.forEach(element => {
        const content = element.textContent;

        if (content == input) {
            const parentElement = element.parentElement;

            parentElement.remove();

            result = 'Deleted.';
        }
    });

    resultElement.textContent = result;
}
