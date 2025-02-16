function solve(input) {
    const [flights, flightsChanged, status] = input;

    const flightsData = flights.reduce((acc, curr) => {
        const whiteSpaceIndex = curr.indexOf(' ');

        const flightNumber = curr.substring(0, whiteSpaceIndex);
        const destination = curr.substring(whiteSpaceIndex + 1);

        acc[flightNumber] = { Destination: destination, Status: '' };

        return acc;
    }, {});

    flightsChanged.forEach((flight) => {
        const [flightNumber, status] = flight.split(' ');

        const flightToUpdate = flightsData[flightNumber];

        if (flightToUpdate) {
            flightToUpdate['Status'] = status;
        }
    });

    if (status[0] === 'Ready to fly') {
        for (let flightNumber in flightsData) {
            const flightStatus = flightsData[flightNumber]['Status'];

            if (flightStatus === '') {
                flightsData[flightNumber]['Status'] = 'Ready to fly';
                console.log(flightsData[flightNumber]);
            }
        }
    } else {
        for (let flightNumber in flightsData) {
            const flightStatus = flightsData[flightNumber]['Status'];

            if (flightStatus === status[0]) {
                console.log(flightsData[flightNumber]);
            }
        }
    }
}

solve([
    [
        'WN269 Delaware',
        'FL2269 Oregon',
        'WN498 Las vegas',
        'WN3145 Ohio',
        'WN612 Alabama',
        'WN4010 New York',
        'WN1173 California',
        'DL2120 Texas',
        'KL5744 Illinois',
        'WN678 Pennsylvania',
    ],
    ['DL2120 Cancelled', 'WN612 Cancelled', 'WN1173 Cancelled', 'SK330 Cancelled'],
    ['Ready to fly'],
]);
