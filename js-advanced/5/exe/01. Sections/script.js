function create(words) {
    const resultElement = document.getElementById('content');
    const wordsCount = words.length;

    const containerElementsFragment = document.createDocumentFragment();

    for (let i = 0; i < wordsCount; i++) {
        const paragraphElement = document.createElement('p');
        paragraphElement.style.display = 'none';
        paragraphElement.textContent = words[i];

        const containerElement = document.createElement('div');
        containerElement.addEventListener('click', e => {
            paragraphElement.style.display = 'block';
        });

        containerElement.append(paragraphElement);
        containerElementsFragment.append(containerElement);
    }

    resultElement.append(containerElementsFragment);
}
