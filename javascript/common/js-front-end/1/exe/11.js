function solve(speed, area) {
    const roadRadar = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20
    };

    const speedLimit = roadRadar[area];
    const speedDifference = speed - speedLimit;

    if (speedDifference <= 0) {
        return console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
    }

    const speedingStatus =
        speedDifference <= 20
            ? 'speeding'
            : speedDifference <= 40
            ? 'excessive speeding'
            : 'reckless driving';

    return console.log(
        `The speed is ${speedDifference} km/h faster than the allowed speed of ${speedLimit} - ${speedingStatus}`
    );
}

solve(120, 'interstate');
