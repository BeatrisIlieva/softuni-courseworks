function checkDistances(input) {
    const [x1, y1, x2, y2] = input;

    const calculateDistance = (x1, y1, x2, y2) => {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    const isValidDistance = (distance) => Number.isInteger(distance);

    const checks = [
        { point1: [x1, y1], point2: [0, 0] },
        { point1: [x2, y2], point2: [0, 0] },
        { point1: [x1, y1], point2: [x2, y2] },
    ];

    checks.forEach(({ point1, point2 }) => {
        const [p1x, p1y] = point1;
        const [p2x, p2y] = point2;

        const distance = calculateDistance(p1x, p1y, p2x, p2y);

        if (isValidDistance(distance)) {
            console.log(`{${p1x}, ${p1y}} to {${p2x}, ${p2y}} is valid`);
        } else {
            console.log(`{${p1x}, ${p1y}} to {${p2x}, ${p2y}} is invalid`);
        }
    });
}

checkDistances([3, 0, 0, 4]);
