document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const submitButton = document.querySelector('input[type=submit]');
    const resetButton = document.querySelector('input[type=reset]');
    const checkElement = document.getElementById('check');

    submitButton.addEventListener('click', e => submitHandler(e));
    resetButton.addEventListener('click', e => resetHandler(e));

    function submitHandler(e) {
        e.preventDefault();

        const tableFirstRowElements = document.querySelectorAll('tbody tr:nth-child(1) td');
        const tableSecondRowElements = document.querySelectorAll('tbody tr:nth-child(2) td');
        const tableThirdRowElements = document.querySelectorAll('tbody tr:nth-child(3) td');
        const tableFirstColElements = document.querySelectorAll('tbody tr td:nth-child(1)');
        const tableSecondColElements = document.querySelectorAll('tbody tr td:nth-child(2)');
        const tableThirdColElements = document.querySelectorAll('tbody tr td:nth-child(3)');
        console.log(tableFirstRowElements);
        const size = Number(document.querySelector('#size option:checked').value);

        const tableFirstRowIsInvalid = validate(tableFirstRowElements);
        const tableSecondRowIsInvalid = validate(tableSecondRowElements);
        const tableThirdRowIsInvalid = validate(tableThirdRowElements);
        const tableFirstColIsInvalid = validate(tableFirstColElements);
        const tableSecondColIsInvalid = validate(tableSecondColElements);
        const tableThirdColIsInvalid = validate(tableThirdColElements);

        const isWin =
            tableFirstRowIsInvalid &&
            tableSecondRowIsInvalid &&
            tableThirdRowIsInvalid &&
            tableFirstColIsInvalid &&
            tableSecondColIsInvalid &&
            tableThirdColIsInvalid;

        function validate(collection) {
            let numbersSet = new Set();

            [...collection].forEach(element => {
                element.querySelectorAll('input').forEach(input => {
                    const number = Number(input.value);

                    if (number >= 1 && number <= size) {
                        numbersSet.add(number);
                    }
                });
            });

            if (numbersSet.size < 3) {
                return false;
            }

            return true;
        }

        checkElement.textContent = isWin ? 'Success!' : 'Keep trying ...';
    }

    function resetHandler(e) {
        const inputElements = document.querySelectorAll('input[type=number]');

        inputElements.forEach(element => (element.value = ''));

        checkElement.textContent = '';
    }
}
