document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const contentElement = document.getElementById('content');
    const words = document.querySelector('form#task-input input[type=text]').value.split(', ');

    const divElements = words.map((word) => {
        const pElement = document.createElement('p');
        pElement.style.display = 'none';
        pElement.textContent = word;

        const divElement = document.createElement('div');
        divElement.appendChild(pElement);

        return divElement;
    });

    // Attach multiple event listeners without event delegation
    //  divElements.forEach((divElement) => {
    //      divElement.addEventListener('click', () => {
    //          const pElement = divElement.querySelector('p');
    //          pElement.style.display = 'block';
    //      });
    //  });

    //  contentElement.append(...divElements);
    const divElementsFragment = document.createDocumentFragment();
    divElements.forEach((divElement) => divElementsFragment.appendChild(divElement));
    contentElement.appendChild(divElementsFragment);

    // Attach multiple event listeners with event delegation
    contentElement.addEventListener('click', (e) => {
        // console.log(e.currentTarget); // currentTarget is the element on which we attach the event
        // console.log(e.target);
        // console.log(e.target.tagName);
        if (e.target.tagName === 'DIV') {
            const pElement = e.target.querySelector('p');
            pElement.style.display = 'block';
        }
    });
}
