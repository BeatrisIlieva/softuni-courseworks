document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const encodeFormElement = document.getElementById('encode');
    const decodeFormElement = document.getElementById('decode');

    encodeFormElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const textAreaElement = e.target.querySelector('textarea');
        const text = textAreaElement.value;

        if (text === '') {
            return;
        }

        const encodedText = text
            .split('')
            .map((char) => {
                const decodedAsciiValue = char.charCodeAt(0) + 1;
                return String.fromCharCode(decodedAsciiValue);
            })
            .join('');

        const decodeFormElementTextArea = decodeFormElement.querySelector('textarea');

        decodeFormElementTextArea.value = encodedText;

        textAreaElement.value = '';
    });

    decodeFormElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const textAreaElement = e.target.querySelector('textarea');
        const text = textAreaElement.value;

        if (text === '') {
            return;
        }

        const encodedText = text
            .split('')
            .map((char) => {
                const decodedAsciiValue = char.charCodeAt(0) - 1;
                return String.fromCharCode(decodedAsciiValue);
            })
            .join('');

        textAreaElement.value = encodedText;
    });
}
