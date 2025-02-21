function validate() {
    const inputElement = document.getElementById('email');

    const pattern = /^[a-z]{1,}@[a-z]{1,}\.[a-z]{1,}$/;

    inputElement.addEventListener('change', e => {
        const userEmail = inputElement.value;

        const isValid = pattern.test(userEmail);

        if (!isValid) {
            inputElement.classList.add('error');
        } else {
            inputElement.classList.remove('error');
        }
    });
}
