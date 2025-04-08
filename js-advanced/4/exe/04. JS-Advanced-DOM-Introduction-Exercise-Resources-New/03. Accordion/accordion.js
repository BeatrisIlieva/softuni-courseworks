function toggle() {
    const extraContent = document.getElementById('extra');
    const spanElement = document.querySelector('.button');
    const currentTextContent = spanElement.textContent;

    function toggleButtonText() {
        spanElement.textContent = currentTextContent === 'More' ? 'Less' : 'More';
    }

    function toggleExtraContentVisibility() {
        extraContent.style.display = currentTextContent === 'More' ? 'block' : 'none';
    }

    toggleButtonText();
    toggleExtraContentVisibility();
}
