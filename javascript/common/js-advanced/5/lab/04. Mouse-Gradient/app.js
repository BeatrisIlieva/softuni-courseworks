function attachGradientEvents() {
    const gradientElement = document.getElementById('gradient');
    const resultElement = document.getElementById('result');

    gradientElement.addEventListener('mousemove', e => {
        const gradientElementWidth = gradientElement.offsetWidth;

        const mousePosition = e.offsetX;
        const percentage = Math.floor((Number(mousePosition) / Number(gradientElementWidth)) * 100);

        resultElement.textContent = `${percentage}%`;
    });
}
