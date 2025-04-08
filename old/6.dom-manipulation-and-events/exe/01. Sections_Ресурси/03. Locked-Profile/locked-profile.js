document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const buttons = document.querySelectorAll('button');

    for (let button of buttons) {
        button.addEventListener('click', () => {
            const moreInfoElement = button.parentElement.querySelector('.hidden-fields.active');

            const lockInput = button.parentElement.querySelector('input[type=radio]:first-of-type');
            const unlockInput = button.parentElement.querySelector(
                'input[type=radio]:nth-of-type(2)'
            );

            if (lockInput.checked) {
                return;
            }

            moreInfoElement.style.display =
                moreInfoElement.style.display === 'block' ? 'none' : 'block';

            button.textContent = button.textContent === 'Show more' ? 'Show less' : 'Show more';
        });
    }
}
