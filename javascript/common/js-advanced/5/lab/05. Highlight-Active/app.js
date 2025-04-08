function focused() {
    const inputElements = document.querySelectorAll('input');

    inputElements.forEach(element => {
        element.addEventListener('focus', e => {
            element.parentElement.classList.add('focused');
        });
    });

    inputElements.forEach(element => {
        element.addEventListener('blur', e => {
            element.parentElement.classList.remove('focused');
        });
    });
}
