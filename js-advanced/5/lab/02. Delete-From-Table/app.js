function deleteByEmail() {
    const inputElement = document.querySelector('input[name=email]');
    const tdElements = document.querySelectorAll('#customers tbody tr td:nth-child(2)');
    const resultElement = document.getElementById('result');

    const input = inputElement.value;

    const matchedEmail = Array.from(tdElements).find(element => {
        const email = element.textContent;

        return email === input;
    });

    if (matchedEmail) {
        matchedEmail.parentElement.remove();
        resultElement.textContent = 'Deleted.';
    } else {
        resultElement.textContent = 'Not found.';
    }

    inputElement.textContent = '';
    inputElement.focus();
}
