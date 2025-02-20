function attachGradientEvents() {
    const gradientElement = document.getElementById('gradient');
    const resultElement = document.getElementById('result');

    gradientElement.addEventListener('mousemove', e => {
        const gradientElementWidth = e.currentTarget.offsetWidth;

        const mousePosition = e.offsetX;
        const percentage = Math.floor((mousePosition / gradientElementWidth) * 100);

        resultElement.textContent = percentage;
    });
}
