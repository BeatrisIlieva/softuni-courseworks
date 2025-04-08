function solve() {
    const inoutElement = document.getElementById('input');
    const outputElement = document.getElementById('output');

    const input = inoutElement.value;

    const sentencesAsArray = input
        .split('.')
        .filter(sentence => sentence)
        .map(sentence => sentence.trim() + '.');

    const result = sentencesAsArray.reduce((acc, curr, index) => {
        const currentArray = acc[Math.floor(index / 3)] || [];

        if (currentArray.length == 0) {
            acc.push(currentArray);
        }

        currentArray.push(curr);

        return acc;
    }, []);

    result.forEach(element => {
        const paragraphElement = document.createElement('p');

        element.forEach(sentence => (paragraphElement.textContent += sentence));

        outputElement.append(paragraphElement);
    });
}
