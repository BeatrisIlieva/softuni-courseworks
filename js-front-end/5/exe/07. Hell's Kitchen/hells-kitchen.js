function solve() {
    const input = JSON.parse(document.querySelector('textarea').value);

    const bestRestaurantElement = document.querySelector('#bestRestaurant p');
    const workersElement = document.querySelector('#workers p');

    const restaurantData = input.reduce((acc, curr) => {
        let [restaurantName, workers] = curr.split(' - ');
        workers = workers.split(', ');

        acc[restaurantName] ??= {};

        workers.forEach(worker => {
            const [name, salary] = worker.split(' ');

            acc[restaurantName][name] = salary;
        });

        return acc;
    }, {});

    const sortedRestaurantNames = Object.keys(restaurantData).sort((a, b) => {
        return calculateAverageSalary(b) - calculateAverageSalary(a);
    });

    const bestRestaurantName = sortedRestaurantNames[0];

    const highestAverageSalary = calculateAverageSalary(bestRestaurantName);

    const sortedBestWorkerNames = Object.keys(restaurantData[bestRestaurantName]).sort((a, b) => {
        return restaurantData[bestRestaurantName][b] - restaurantData[bestRestaurantName][a];
    });

    const bestSalary = Number(restaurantData[bestRestaurantName][sortedBestWorkerNames[0]]).toFixed(
        2
    );

    function calculateAverageSalary(restaurantName) {
        const workers = restaurantData[restaurantName];
        const salaries = Object.values(workers);

        const totalSalary = salaries.reduce((acc, curr) => acc + Number(curr), 0);
        const averageSalary = totalSalary / salaries.length;

        return averageSalary.toFixed(2);
    }

    bestRestaurantElement.textContent = `Name: ${bestRestaurantName} Average Salary: ${highestAverageSalary} Best Salary: ${bestSalary}`;

    const bestWorkersContent = sortedBestWorkerNames
        .map(workerName => {
            const salary = restaurantData[bestRestaurantName][workerName];

            return `Name: ${workerName} With Salary: ${salary}`;
        })
        .join(' ');

    workersElement.textContent = bestWorkersContent;
}
