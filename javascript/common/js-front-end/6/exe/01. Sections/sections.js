document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const submitElement = document.querySelector('#task-input input[type=submit]');

    submitElement.addEventListener('click', e => {
        e.preventDefault();

        function isValidJSON(str) {
            try {
                JSON.parse(str);
                return true;
            } catch (e) {
                return false;
            }
        }

        const inputElement = document.querySelector('#task-input input[type=text]');
        let sections = inputElement.value;

        const isArray = isValidJSON(sections);

        if (!isArray) {
            sections = sections
                .split(', ')
                .map(str => str.trim())
                .filter(s => s.length > 0);
        } else {
            sections = JSON.parse(inputElement.value).filter(el => el !== '');
        }

        if (sections.length > 0) {
            const contentElement = document.getElementById('content');
            contentElement.innerHTML = '';
            const fragmentElement = document.createDocumentFragment();

            sections.forEach(content => {
                const paragraphElement = document.createElement('p');
                paragraphElement.textContent = content;
                paragraphElement.style.display = 'none';

                const divElement = document.createElement('div');

                divElement.addEventListener('click', e => {
                    paragraphElement.style.display = 'block';
                });

                divElement.append(paragraphElement);

                fragmentElement.append(divElement);
            });

            contentElement.append(fragmentElement);

            inputElement.value = '';
            inputElement.focus();
        }
    });
}
