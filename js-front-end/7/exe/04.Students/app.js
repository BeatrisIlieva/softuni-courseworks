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

const formElement = document.getElementById('form');

formElement.addEventListener('submit', submitHandler);

const resultsElement = document.querySelector('#results tbody');

const baseUrl =
    'http://localhost:3030/jsonstore/collections/students';

function onLoad() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            Object.values(result).forEach(entry =>
                resultsElement.appendChild(createTableRow(entry))
            );
        })
        .catch(err => console.log(err.message));
}

function submitHandler(e) {
    e.preventDefault();

    const firstName = firstNameInputElement.value;
    const lastName = lastNameInputElement.value;
    const facultyNumber = facultyNumberInputElement.value;
    const grade = gradeInputElement.value;

    if (
        firstName === '' ||
        lastName === '' ||
        facultyNumber === '' ||
        grade === ''
    ) {
        return;
    }

    const data = { firstName, lastName, facultyNumber, grade };

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            resultsElement.appendChild(createTableRow(result));
            formElement.reset();
        })
        .catch(err => console.log(err.message));
}

function createTableRow(data) {
    const tdFirstNameElement = document.createElement('td');
    tdFirstNameElement.textContent = data.firstName;

    const tdLastNameElement = document.createElement('td');
    tdLastNameElement.textContent = data.lastName;

    const tdFacultyNumberElement = document.createElement('td');
    tdFacultyNumberElement.textContent = data.facultyNumber;

    const tdGradeElement = document.createElement('td');
    tdGradeElement.textContent = data.grade;

    const tableRowElement = document.createElement('tr');

    tableRowElement.appendChild(tdFirstNameElement);
    tableRowElement.appendChild(tdLastNameElement);
    tableRowElement.appendChild(tdFacultyNumberElement);
    tableRowElement.appendChild(tdGradeElement);

    return tableRowElement;
}

onLoad();
