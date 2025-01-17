document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const formElement = document.getElementById('solutionCheck');
    const resetButton = document.querySelector('.buttons input[type="reset"]');
    const pCheckElement = document.getElementById('check');


    resetButton.addEventListener('click', () => {
        pCheckElement.textContent = '';

        const firstRow = Array.from(document.querySelectorAll('table tbody tr:nth-child(1) td'));
        const secondRow = Array.from(document.querySelectorAll('table tbody tr:nth-child(2) td'));
        const thirdRow = Array.from(document.querySelectorAll('table tbody tr:nth-child(3) td'));

        firstRow.map((cell) => (cell.querySelector('input').value = ''));
        secondRow.map((cell) => (cell.querySelector('input').value = ''));
        thirdRow.map((cell) => (cell.querySelector('input').value = ''));
    });

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstRow = Array.from(document.querySelectorAll('table tbody tr:nth-child(1) td'));
        const secondRow = Array.from(document.querySelectorAll('table tbody tr:nth-child(2) td'));
        const thirdRow = Array.from(document.querySelectorAll('table tbody tr:nth-child(3) td'));

        const firstRowAsArray = firstRow.map((cell) => Number(cell.querySelector('input').value));
        const secondRowAsArray = secondRow.map((cell) => Number(cell.querySelector('input').value));
        const thirdRowAsArray = thirdRow.map((cell) => Number(cell.querySelector('input').value));

        const matrix = [firstRowAsArray, secondRowAsArray, thirdRowAsArray];

        let won = false;
        let numbersUsed = [];

        for (let row = 0; row < matrix.length; row++) {
            let count = 1;

            for (let col = 0; col < matrix.length; col++) {
                let currentCell = matrix[row][col];

                const directions = {
                    up: [-1, 0],
                    down: [1, 0],
                    left: [0, -1],
                    right: [0, 1],
                };

                for (let direction in directions) {
                    let currentRow = row + directions[direction][0];
                    let currentCol = col + directions[direction][1];

                    if (
                        currentRow < 0 ||
                        currentRow >= matrix.length ||
                        currentCol < 0 ||
                        currentCol >= matrix.length
                    ) {
                        continue;
                    }

                    numbersUsed.push(Number(matrix[currentRow][currentCol]));

                    if (matrix[currentRow][currentCol] === currentCell) {
                        count++;
                        if (count === 3) {
                            won = true;
                            break;
                        }
                    }
                }
            }
        }

        pCheckElement.textContent = won ? 'Success!' : 'Keep trying...';
    });
}
