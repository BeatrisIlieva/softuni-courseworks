function lockedProfile() {
    const showMoreButtonElements = document.querySelectorAll('button');

    showMoreButtonElements.forEach(button => {
        button.addEventListener('click', e => {
            const parentElement = button.parentElement;
            const unlockRadio = parentElement.querySelector('input[value=lock]');

            if (unlockRadio.checked) {
                return;
            }

            const buttonText = button.textContent;
            const hiddenContent = parentElement.querySelector('div');

            if (buttonText === 'Show more') {
                hiddenContent.style.display = 'block';

                button.textContent = 'Hide it';
            } else {
                hiddenContent.style.display = 'none';

                button.textContent = 'Show more';
            }
        });
    });
}
