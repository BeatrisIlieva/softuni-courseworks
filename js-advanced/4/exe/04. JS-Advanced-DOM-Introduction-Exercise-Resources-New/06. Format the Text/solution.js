function solve() {
    const textAreaElement = document.getElementById('input');
    const outputElement = document.getElementById('output');

    const text = textAreaElement.value;

    const pattern = /[^.]+(?:\.\s*|$)/g;

    const matches = Array.from(text.matchAll(pattern));

    const pElementsFragment = document.createDocumentFragment();
    let pElement;

    for (let i = 0; i < matches.length; i++) {
        const sentence = matches[i];

        if (i % 3 === 0) {
            pElement = document.createElement('p');
            pElementsFragment.appendChild(pElement);
        }

        pElement.textContent += sentence;
    }

    outputElement.appendChild(pElementsFragment);
}




