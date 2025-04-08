function lockedProfile() {
    const showMoreButtonElements = document.querySelectorAll('button');

    showMoreButtonElements.forEach(button => {
        button.addEventListener('click', e => {
            const parentElement = button.parentElement;
            const lockRadio = parentElement.querySelector('input[value=lock]');

            if (lockRadio.checked) {
                return;
            }

            const buttonText = button.textContent;
            const hiddenContent = parentElement.querySelector('div');

            const isInShowMoreState = buttonText === 'Show more';

            hiddenContent.style.display = isInShowMoreState ? 'block' : 'none';
            button.textContent = isInShowMoreState ? 'Hide it' : 'Show more';
        });
    });
}
