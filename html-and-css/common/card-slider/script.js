const carouselElements = document.querySelectorAll('.carousel');

carouselElements.forEach(sliderElement => {
    sliderElement.addEventListener('click', e => {
        const carouselElement = e.currentTarget;
        const buttonElement = e.target;

        const ulElement = carouselElement.querySelector('ul');
        const liElements = Array.from(ulElement.querySelectorAll('li'));

        if (buttonElement.tagName === 'BUTTON') {
            const buttonId = buttonElement.id;

            return functionMapper[buttonId](liElements);
        }
    });

    const functionMapper = {
        next: liElements => displayNextElement(liElements),
        previous: liElements => displayPreviousElement(liElements),
    };
});

function displayNextElement(elements) {
    for (let i = 0; i < elements.length; i++) {
        let currentElement = elements[i];

        if (window.getComputedStyle(currentElement).display === 'block') {
            currentElement.style.display = 'none';

            const nextIndex = (i + 1) % elements.length;
            elements[nextIndex].style.display = 'block';

            break;
        }
    }
}

function displayPreviousElement(elements) {
    for (let i = elements.length - 1; i >= 0; i--) {
        let currentElement = elements[i];

        if (window.getComputedStyle(currentElement).display === 'block') {
            currentElement.style.display = 'none';

            const previousIndex = (i - 1 + elements.length) % elements.length;
            elements[previousIndex].style.display = 'block';

            break;
        }
    }
}
