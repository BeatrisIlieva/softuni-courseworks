document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const contentElement = document.getElementById('content');
    const formElement = document.getElementById('task-input');

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const sections = formElement.querySelector('input[type=text]').value.split(', ');

        sections.forEach((section) => {
            const pElement = document.createElement('p');
            pElement.style.display = 'none';
            pElement.textContent = section;

            const divElement = document.createElement('div');
            divElement.appendChild(pElement);

            divElement.addEventListener('click', () => {
                const pElement = divElement.querySelector('p');
                pElement.style.display = 'block';
            });

            contentElement.appendChild(divElement);
        });
    });
}
