function extractText() {
    const listItemElements = document.querySelectorAll('#items li');
    const textAreaElement = document.getElementById('result');

    for (let item of listItemElements) {
        console.log(item);
        textAreaElement.textContent += item.textContent + '\n';
    }
}
