function extractText() {
    const listItems = document.querySelectorAll('#items li');
    const resultElement = document.getElementById('result');

    const textItems = [...listItems].map(item => item.textContent);

    resultElement.value = textItems.join('\n');
}
