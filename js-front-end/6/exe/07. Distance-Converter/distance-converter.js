document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const buttonElement = document.getElementById('convert');

    buttonElement.addEventListener('click', e => clickHandler(e));

    const convertToMeters = {
        km: number => number * 1000,
        m: number => number * 1,
        cm: number => number * 0.01,
        mm: number => number * 0.001,
        mi: number => number * 1609.34,
        yrd: number => number * 0.9144,
        ft: number => number * 0.3048,
        in: number => number * 0.0254
    };

    const convertFromMeters = {
        km: number => number / 1000,
        m: number => number / 1,
        cm: number => number / 0.01,
        mm: number => number / 0.001,
        mi: number => number / 1609.34,
        yrd: number => number / 0.9144,
        ft: number => number / 0.3048,
        in: number => number / 0.0254
    };

    function clickHandler() {
        const selectedInputUnitElement = document.querySelector('#inputUnits option:checked');
        const selectedOutputUnitElement = document.querySelector('#outputUnits option:checked');

        const outputDistanceElement = document.getElementById('outputDistance');
        const inputDistanceElement = document.getElementById('inputDistance');

        const selectedInputUnit = selectedInputUnitElement.value;
        const selectedOutputUnit = selectedOutputUnitElement.value;
        const inputDistance = Number(inputDistanceElement.value);
        const inputToMeters = convertToMeters[selectedInputUnit](inputDistance);

        const output = convertFromMeters[selectedOutputUnit](inputToMeters);

        outputDistanceElement.value = output;
    }
}
