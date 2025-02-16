document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const timeMapper = {
        seconds: {
            minutes: (number) => number / 60,
            hours: (number) => number / 60 / 60,
            days: (number) => number / 60 / 60 / 24,
        },
        minutes: {
            seconds: (number) => number * 60,
            hours: (number) => number / 60,
            days: (number) => number / 60 / 24,
        },
        hours: {
            seconds: (number) => number * 60 * 60,
            minutes: (number) => number * 60,
            days: (number) => number / 24,
        },
        days: {
            seconds: (number) => number * 24 * 60 * 60,
            minutes: (number) => number * 24 * 60,
            hours: (number) => number * 24,
        },
    };

    const mainElement = document.querySelector('main');

    mainElement.addEventListener('submit', (e) => {
        e.preventDefault();

        if (e.target.tagName === 'FORM') {
            const inputElement = e.target.querySelector('input[type=number]');
            const input = Number(inputElement.value);

            const formElements = mainElement.getElementsByTagName('form');

            for (let formElement of formElements) {
                let inputElement = formElement.querySelector('input[type=number]');
                let targetName = e.target.id;
                let formName = formElement.id;

                if (targetName === formName) {
                    continue;
                }

                let measurement = timeMapper[targetName][formName](input);
                inputElement.value = measurement.toFixed(2);
            }
        }
    });
}
