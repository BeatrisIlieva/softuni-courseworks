document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const buttonElements = document.querySelectorAll('button');

    buttonElements.forEach(button => button.addEventListener('click', e => clickHandler(e)));

    function clickHandler(e) {
        const button = e.currentTarget;

        const profileElement = button.closest('.profile');

        const lockingRadioButton = profileElement.querySelector('input[type=radio][name*=Locked]');

        const profileIsLocked = lockingRadioButton.checked;

        if (profileIsLocked) return;

        const buttonTextContent = button.textContent;
        const isInShowMoreState = buttonTextContent === 'Show less';

        const hiddenField = profileElement.querySelector('.hidden-fields');

        hiddenField.style.display = isInShowMoreState ? 'none' : 'block';
        button.textContent = isInShowMoreState ? 'Show more' : 'Show less';
    }
}
