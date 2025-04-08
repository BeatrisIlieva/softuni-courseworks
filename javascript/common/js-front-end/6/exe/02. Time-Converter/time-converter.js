document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const formElements = document.querySelectorAll('form');

    formElements.forEach(form => form.addEventListener('submit', submitHandler));

    const fromSecondsConverter = {
        days: seconds => seconds / 24 / 60 / 60,
        hours: seconds => seconds / 60 / 60,
        minutes: seconds => seconds / 60,
        seconds: seconds => seconds
    };

    const toSecondsConverter = {
        days: input => input * 24 * 60 * 60,
        hours: input => input * 60 * 60,
        minutes: input => input * 60,
        seconds: input => input
    };

    function populateInputs(inputToSeconds) {
        const daysInputElement = document.getElementById('days-input');
        const hoursInputElement = document.getElementById('hours-input');
        const minutesInputElement = document.getElementById('minutes-input');
        const secondsInputElement = document.getElementById('seconds-input');

        const daysResult = fromSecondsConverter.days(inputToSeconds);
        daysInputElement.value = daysResult.toFixed(2);

        const hoursResult = fromSecondsConverter.hours(inputToSeconds);
        hoursInputElement.value = hoursResult.toFixed(2);

        const minutesResult = fromSecondsConverter.minutes(inputToSeconds);
        minutesInputElement.value = minutesResult.toFixed(2);

        const secondsResult = fromSecondsConverter.seconds(inputToSeconds);
        secondsInputElement.value = secondsResult.toFixed(2);
    }

    function submitHandler(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formId = form.id;
        const input = Number(form.querySelector('input[type=number]').value);
        const inputToSeconds = toSecondsConverter[formId](input);

        populateInputs(inputToSeconds);
    }
}
