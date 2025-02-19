function extractText() {
    const itemsElements = document.querySelectorAll('#items li');
    const itemsElementsAsArray = Array.from(itemsElements);
    const resultElement = document.getElementById('result');
    
    const textContent = itemsElementsAsArray.map(element => element.textContent);

    resultElement.textContent = textContent.join('\n');
}