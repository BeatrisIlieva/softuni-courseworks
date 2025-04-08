function solve() {
    const input = document.querySelector('#inputs textarea').value;

    const outputBestRestaurantElement = document.querySelector('#bestRestaurant p');
    const outputWorkersElement = document.querySelector('#workers p');

    const restaurants = JSON.parse(input).reduce((acc, curr) => {
        const [restaurantName, workersData] = curr.split(' - ');

        const workers = workersData.split(', ').map((data) => {
            const [workerName, salary] = data.split(' ');

            return { name: workerName, salary: Number(salary) };
        });

        acc[restaurantName] ??= { workers: [] };
        acc[restaurantName].workers.push(...workers);

        return acc;
    }, {});

    function calculateAverageSalary(restaurant) {
        const totalSalary = restaurant.workers.reduce((acc, curr) => acc + curr.salary, 0);

        return totalSalary / restaurant.workers.length;
    }

    const [bestRestaurant] = Object.keys(restaurants).sort(
        (a, b) => calculateAverageSalary(restaurants[b]) - calculateAverageSalary(restaurants[a])
    );
    const bestRestaurantAvgSalary = calculateAverageSalary(restaurants[bestRestaurant]);
    const bestRestaurantWorkers = restaurants[bestRestaurant].workers.toSorted(
        (a, b) => b.salary - a.salary
    );
    const bestRestaurantHighestSalary = bestRestaurantWorkers[0].salary;

    outputBestRestaurantElement.textContent = `Name: ${bestRestaurant} `;
    outputBestRestaurantElement.textContent += `Average Salary: ${bestRestaurantAvgSalary.toFixed(
        2
    )} `;
    outputBestRestaurantElement.textContent += `Best Salary: ${bestRestaurantHighestSalary.toFixed(
        2
    )}`;

    const workersString = bestRestaurantWorkers
        .map((w) => `Name: ${w.name} With Salary: ${w.salary}`)
        .join(' ');
    outputWorkersElement.textContent = workersString;
}
