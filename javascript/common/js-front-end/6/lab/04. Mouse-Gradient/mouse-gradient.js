function attachGradientEvents() {
    const gradientElement = document.getElementById('gradient');
    const resultElement = document.getElementById('result');

    gradientElement.addEventListener('mousemove', e => {
        const gradientElementWidth = gradientElement.clientWidth;

        const currentPosition = e.offsetX;

        const percentage = Math.floor((currentPosition / gradientElementWidth) * 100);

        resultElement.textContent = `${percentage}%`;
    });
}
