function solve(input) {
    const garages = input.reduce((acc, curr) => {
        const [garage, info] = curr.split(' - ');

        if (!acc[garage]) {
            acc[garage] = [];
        }

        const currentCar = {};

        info.split(', ').forEach((kvp) => {
            const [key, value] = kvp.split(': ');

            currentCar[key] = value;
        });

        acc[garage].push(currentCar);

        return acc;
    }, {});

    Object.entries(garages).map(([number, cars]) => {
        console.log(`Garage № ${number}`);

        cars.forEach((car) => {
            const result = [];
            Object.entries(car).forEach((kvp) => {
                const [key, value] = kvp;
                result.push(`${key} - ${value}`);
            });
            console.log(`--- ${result.join(', ')}`);
        });
    });
}

solve([
    '1 - color: blue, fuel type: diesel',
    '1 - color: red, manufacture: Audi',
    '2 - fuel type: petrol',
    '4 - color: dark blue, fuel type: diesel, manufacture: Fiat',
]);
