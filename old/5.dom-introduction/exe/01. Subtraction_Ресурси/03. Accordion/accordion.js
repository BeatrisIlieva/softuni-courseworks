function toggle() {
    const buttonTextElement = document.querySelector('.button');
    const extraTextElement = document.getElementById('extra');

    const buttonText = buttonTextElement.textContent;

    const mapper = {
        More: ['block', 'Less'],
        Less: ['none', 'More'],
    };

    extraTextElement.style.display = mapper[buttonText][0];
    buttonTextElement.textContent = mapper[buttonText][1];
}
