function solve(driverSpeed, area) {
    let speedLimit;

    switch (area) {
        case 'motorway':
            speedLimit = 130;
            break;
        case 'interstate':
            speedLimit = 90;
            break;
        case 'city':
            speedLimit = 50;
            break;
        case 'residential':
            speedLimit = 20;
            break;
    }

    const difference = driverSpeed - speedLimit;

    if (difference <= 0) {
        return console.log(
            `Driving ${driverSpeed} km/h in a ${speedLimit} zone`
        );
    }

    let status;

    if (difference <= 20) {
        status = 'speeding';
    } else if (difference <= 40) {
        status = 'excessive speeding';
    } else {
        status = 'reckless driving';
    }

    console.log(
        `The speed is ${difference} km/h faster than the allowed speed of ${speedLimit} - ${status}`
    );
}

solve(40, 'city');
