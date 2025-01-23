// const nextButtonElements = document.querySelectorAll('.next');
// const previousButtonElements = document.querySelectorAll('.previous');

// nextButtonElements.forEach(button => {
//     button.addEventListener('click', e => {
//         const button = e.target;

//         button.style.color = 'red';

        // const carouselElement = button.closest('.slider');

        // const ulElement = parentElement.querySelector('ul');

        // const liElements = Array.from(ulElement.querySelectorAll('li'));

//         return updateDisplayProperty(liElements);
//     });
// });

// previousButtonElements.forEach(button => {
//     button.addEventListener('click', e => {
//         const button = e.target;

//         button.style.color = 'red';

//         const parentElement = button.closest('.slider');

//         const ulElement = parentElement.querySelector('ul');

//         const liElements = Array.from(ulElement.querySelectorAll('li'));

//         return updateDisplayPropertyBackwards(liElements);
//     });
// });

function displayNextElement(liElements) {
    for (let i = 0; i < liElements.length - 1; i++) {
        let currentElement = liElements[i];

        if (window.getComputedStyle(currentElement).display === 'block') {
            currentElement.style.display = 'none';
            liElements[i + 1].style.display = 'block';

            break;
        }
    }
}

function displayPreviousElement(liElements) {
    for (let i = liElements.length - 1; i > 0; i--) {
        let currentElement = liElements[i];

        if (window.getComputedStyle(currentElement).display === 'block') {
            currentElement.style.display = 'none';
            liElements[i - 1].style.display = 'block';

            break;
        }
    }
}

const sliderElements = document.querySelectorAll('.slider');

sliderElements.forEach(sliderElement => {
    sliderElement.addEventListener('click', e => {
        const buttonElement = e.target;
        const carouselElement = e.currentTarget;

        const ulElement = carouselElement.querySelector('ul');
        const liElements = Array.from(ulElement.querySelectorAll('li'));

        if (buttonElement.tagName === 'BUTTON') {
            const buttonId = buttonElement.id;

            return functionMapper[buttonId](liElements);
            // if (buttonElement.id === 'next') {
            //     return displayNextElement(liElements);
            // } else if (buttonElement.id === 'previous') {
            //     return displayPreviousElement(liElements);
            // }
        }
    });

    const functionMapper = {
        'next': (liElements) => displayNextElement(liElements),
        'previous': (liElements) => displayPreviousElement(liElements)
    }
});
