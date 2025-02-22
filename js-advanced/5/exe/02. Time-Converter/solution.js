function attachEventsListeners() {
    const daysBtn = document.getElementById('daysBtn');
    const hoursBtn = document.getElementById('hoursBtn');
    const minutesBtn = document.getElementById('minutesBtn');
    const secondsBtn = document.getElementById('secondsBtn');

    const daysInput = document.getElementById('days');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    const timeMapper = {
        days: seconds => seconds / 24 / 60 / 60,
        hours: seconds => seconds / 60 / 60,
        minutes: seconds => seconds / 60
    };

    daysBtn.addEventListener('click', e => {
        const inputInSeconds = daysInput.value * 24 * 60 * 60;

        hoursInput.value = timeMapper.hours(inputInSeconds);
        minutesInput.value = timeMapper.minutes(inputInSeconds);
        secondsInput.value = inputInSeconds;
    });

    hoursBtn.addEventListener('click', e => {
        const inputInSeconds = hoursInput.value * 60 * 60;

        daysInput.value = timeMapper.days(inputInSeconds);
        minutesInput.value = timeMapper.minutes(inputInSeconds);
        secondsInput.value = inputInSeconds;
    });

    minutesBtn.addEventListener('click', e => {
        const inputInSeconds = minutesInput.value * 60;

        daysInput.value = timeMapper.days(inputInSeconds);
        hoursInput.value = timeMapper.hours(inputInSeconds);
        secondsInput.value = inputInSeconds;
    });

    secondsBtn.addEventListener('click', e => {
        const inputInSeconds = secondsInput.value;

        daysInput.value = timeMapper.days(inputInSeconds);
        hoursInput.value = timeMapper.hours(inputInSeconds);
        minutesInput.value = timeMapper.minutes(inputInSeconds);
    });
}
