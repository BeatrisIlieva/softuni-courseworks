document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const conversionFactorsToMeters = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    };

    function convertToMeters(distance, unit) {
        return distance * conversionFactorsToMeters[unit];
    }

    function convertFromMeters(distance, unit) {
        return distance / conversionFactorsToMeters[unit];
    }

    const convertInputElement = document.getElementById('convert');

    convertInputElement.addEventListener('click', (e) => {
        const inputElement = document.getElementById('inputDistance');
        const input = Number(inputElement.value);

        const selectInputUnitsElement = document.getElementById('inputUnits');
        const selectedInputOption = selectInputUnitsElement.querySelector('option:checked').value;
        const inputToMeters = convertToMeters(input, selectedInputOption);

        const selectOutputUnitsElement = document.getElementById('outputUnits');
        const selectedOutputOption = selectOutputUnitsElement.querySelector('option:checked').value;
        const convertedInput = convertFromMeters(inputToMeters, selectedOutputOption);

        const resultElement = document.getElementById('outputDistance');
        resultElement.value = convertedInput;
    });
}
