document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const buttonElements = document.querySelectorAll('button');

    buttonElements.forEach(button => button.addEventListener('click', e => clickHandler(e)));

    function clickHandler(e) {
        e.preventDefault();
        const button = e.currentTarget;

        const textareaElement = button.previousElementSibling;
        const message = textareaElement.value;
        textareaElement.value = '';

        const parentElement = button.closest('form');
        const parentElementId = parentElement.id;

        functionMapper[parentElementId](message);
    }

    const functionMapper = {
        encode: message => {
            const textareaElement = document.querySelector('#decode textarea');
            textareaElement.value = createMessage(message, 1);
        },
        decode: message => {
            const textareaElement = document.querySelector('#decode textarea');
            textareaElement.value = createMessage(message, -1);
        }
    };

    function createMessage(message, delta) {
        return message
            .split('')
            .map(char => String.fromCharCode(char.charCodeAt(0) + delta))
            .join('');
    }
}
