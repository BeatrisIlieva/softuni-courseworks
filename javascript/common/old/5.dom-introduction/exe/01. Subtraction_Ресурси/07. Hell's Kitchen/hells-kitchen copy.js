function solve() {
    const textElement = document.querySelector('#inputs textarea');
    const bestRestaurantParagraphElement = document.querySelector('#bestRestaurant p');
    const workersParagraphElement = document.querySelector('#workers p');
    const text = textElement.value;

    const restaurantsArray = JSON.parse(text);

    const restaurantsData = restaurantsArray.reduce((acc, curr) => {
        const [restaurantName, workersData] = curr.split(' - ');

        if (!acc[restaurantName]) {
            acc[restaurantName] = {};
        }

        const workersDataAsArray = workersData.split(', ');

        workersDataAsArray.forEach((worker) => {
            [workerName, workerSalary] = worker.split(' ');

            acc[restaurantName][workerName] = Number(workerSalary);
        });

        return acc;
    }, {});

    let bestRestaurant = null;
    let highestAverageSalary = 0;

    Object.entries(restaurantsData).forEach(([restaurant, workers]) => {
        let totalSalary = 0;

        Object.entries(workers).forEach(([_, salary]) => {
            totalSalary += Number(salary);
        });

        const averageSalary = totalSalary / Object.keys(workers).length;

        if (averageSalary > highestAverageSalary) {
            highestAverageSalary = averageSalary;
            bestRestaurant = restaurant;
        }
    });

    const bestRestaurantWorkers = restaurantsData[bestRestaurant];

    const sortedWorkersBySalary = Object.entries(bestRestaurantWorkers).sort((a, b) => b[1] - a[1]);

    const workersResultArray = sortedWorkersBySalary.map(
        ([name, salary]) => `Name: ${name} With Salary: ${salary}`
    );

    const workersResultString = workersResultArray.join(' ');

    const highestSalary = sortedWorkersBySalary[0][1];

    const restaurantString = `Name: ${bestRestaurant} Average Salary: ${highestAverageSalary.toFixed(
        2
    )} Best Salary: ${highestSalary.toFixed(2)}`;

    bestRestaurantParagraphElement.textContent = restaurantString;
    workersParagraphElement.textContent = workersResultString;
}
