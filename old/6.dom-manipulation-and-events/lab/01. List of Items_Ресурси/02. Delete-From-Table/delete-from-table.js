function deleteByEmail() {
    const inputElement = document.querySelector('input[name="email"]');
    const resultElement = document.getElementById('result');

    const input = inputElement.value;

    const tableRows = document.querySelectorAll('table tbody tr');

    let isFound = false;

    for (let tableRow of tableRows) {
        let tableData = tableRow.querySelectorAll('td');

        if (tableData[1].textContent === input) {
            tableRow.remove();
            isFound = true;

            resultElement.textContent = 'Deleted.';
        }
    }

    if (!isFound) {
        resultElement.textContent = 'Not found.';
    }
    inputElement.value = '';
}
