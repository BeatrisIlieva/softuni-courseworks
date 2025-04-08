function solve() {
    document.querySelector('#btnSend').addEventListener('click', onClick);

    function onClick() {
        const bestRestaurantElement = document.querySelector('#bestRestaurant p');
        const bestWorkersElement = document.querySelector('#workers p');

        const inputElement = document.querySelector('#inputs textarea');
        const input = JSON.parse(inputElement.value);
        const restaurantPattern = /.+(?=\s\-\s)/;
        const workersPattern = /((?<=\s)[^\-\s]{1,}\s\d{1,})/g;

        const restaurantData = input.reduce((acc, curr) => {
            const restaurantName = curr.match(restaurantPattern)[0];

            if (!acc[restaurantName]) {
                acc[restaurantName] = {};
            }

            const workers = Array.from(curr.match(workersPattern));

            workers.forEach(worker => {
                const [name, salary] = worker.split(' ');

                acc[restaurantName][name] = Number(salary);
            });

            return acc;
        }, {});

        const restaurantNames = Object.keys(restaurantData);

        const sortedRestaurantNames = restaurantNames.sort((a, b) => {
            const firstWorkersObj = restaurantData[a];
            const secondWorkersObj = restaurantData[b];

            const firstWorkersAvgSalary = calculateAverageSalary(firstWorkersObj);
            const secondWorkersAvgSalary = calculateAverageSalary(secondWorkersObj);

            return secondWorkersAvgSalary - firstWorkersAvgSalary;
        });

        function sortWorkerNames(restaurantObject, workerNames) {
            const sortedWorkerNames = workerNames.sort((a, b) => {
                return restaurantObject[b] - restaurantObject[a];
            });

            return sortedWorkerNames;
        }

        const bestRestaurantName = sortedRestaurantNames[0];
        const bestRestaurantObj = restaurantData[bestRestaurantName];

        const averageSalary = calculateAverageSalary(bestRestaurantObj).toFixed(2);

        const workerNames = Object.keys(bestRestaurantObj);
        const sortedWorkerNames = sortWorkerNames(bestRestaurantObj, workerNames);

        const personNameWithHighestSalary = sortedWorkerNames[0];
        const bestSalary = bestRestaurantObj[personNameWithHighestSalary].toFixed(2);

        const bestRestaurantElementContent = `Name: ${bestRestaurantName} Average Salary: ${averageSalary} Best Salary: ${bestSalary}`;
        bestRestaurantElement.textContent = bestRestaurantElementContent;

        let bestWorkersElementContent = ``;
        sortedWorkerNames.forEach(name => {
            const salary = bestRestaurantObj[name];
            bestWorkersElementContent += `Name: ${name} With Salary: ${salary} `;
        });

        bestWorkersElement.textContent = bestWorkersElementContent.trim();
    }

    function calculateAverageSalary(workersObj) {
        const salaries = Object.values(workersObj);
        const countOfPeople = salaries.length;

        const salariesSum = salaries.reduce((acc, curr) => acc + curr, 0);
        const averageSalary = salariesSum / countOfPeople;

        return Number(averageSalary.toFixed(2));
    }
}
