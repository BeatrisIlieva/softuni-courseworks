function toggle() {
    const buttonElement = document.querySelector('span.button');
    const extraContent = document.getElementById('extra');

    const isInShowMoreState = buttonElement.textContent === 'More';

    buttonElement.textContent = isInShowMoreState ? 'Less' : 'More';

    extraContent.style.display = isInShowMoreState ? 'block' : 'none';
}
