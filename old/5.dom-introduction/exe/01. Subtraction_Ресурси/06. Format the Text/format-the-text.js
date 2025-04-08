function solve() {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');

    const input = inputElement.value;

    input
        .split('. ')
        .map((sentence) => sentence)

        .reduce((acc, curr, i) => {
            const index = Math.floor(i / 3);
            if (!acc[index]) {
                acc[index] = [];
            }

            acc[index].push(curr);

            return acc;
        }, [])
        .forEach((element) => {
            const paragraphContent = element.join('. ');
            const paragraph = document.createElement('p');
            paragraph.textContent = paragraphContent;
            outputElement.appendChild(paragraph);
        });
}
