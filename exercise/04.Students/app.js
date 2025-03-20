const baseUrl =
    'http://localhost:3030/jsonstore/collections/students';

const resultsTableElement = document.getElementById('results');
const tbodyElement = document.querySelector('tbody');
const formElement = document.getElementById('form');

const firstNameInputElement = document.querySelector(
    'input[name=firstName]'
);
const lastNameInputElement = document.querySelector(
    'input[name=lastName]'
);
const facultyNumberInputElement = document.querySelector(
    'input[name=facultyNumber]'
);
const gradeInputElement = document.querySelector('input[name=grade]');

fetch(baseUrl)
    .then(response => response.json())
    .then(result => {
        Object.values(result).forEach(item =>
            tbodyElement.appendChild(createTableRow(item))
        );
    });

function createTableRow(data) {
    const firstNameElement = document.createElement('td');
    firstNameElement.textContent = data.firstName;

    const lastNameElement = document.createElement('td');
    lastNameElement.textContent = data.lastName;

    const facultyNumberElement = document.createElement('td');
    facultyNumberElement.textContent = data.facultyNumber;

    const gradeElement = document.createElement('td');
    gradeElement.textContent = data.grade;

    const tableRowElement = document.createElement('tr');
    tableRowElement.appendChild(firstNameElement);
    tableRowElement.appendChild(lastNameElement);
    tableRowElement.appendChild(facultyNumberElement);
    tableRowElement.appendChild(gradeElement);

    return tableRowElement;
}

formElement.addEventListener('submit', submitHandler);

function submitHandler(e) {
    e.preventDefault();

    const firstName = firstNameInputElement.value;
    const lastName = lastNameInputElement.value;
    const facultyNumber = facultyNumberInputElement.value;
    const grade = gradeInputElement.value;

    if (
        firstName.trim() == '' ||
        lastName.trim() == '' ||
        facultyNumber.trim() == '' ||
        grade.trim() == ''
    ) {
        return;
    }

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            facultyNumber,
            grade
        })
    })
        .then(response => response.json())
        .then(result => {
            tbodyElement.appendChild(createTableRow(result));
            firstNameInputElement.value = '';
            lastNameInputElement.value = '';
            facultyNumberInputElement.value = '';
            gradeInputElement.value = '';
        })
        .catch(err => console.log(err.message));
}
