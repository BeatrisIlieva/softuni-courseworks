function attachGradientEvents() {
    const resultElement = document.getElementById('result');
    const gradientElement = document.getElementById('gradient');

    gradientElement.addEventListener('mousemove', (e) => {
        const percentage = Math.floor((e.offsetX / gradientElement.clientWidth) * 100);

        resultElement.textContent = `${percentage}%`;
    });
}
