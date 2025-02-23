function solve() {
    const checkboxElements = document.querySelectorAll('input[type=checkbox]');
    const tableRowElements = document.querySelectorAll('tbody tr');
    const outputElement = document.getElementById('output');

    const checkboxesData = [...checkboxElements].reduce((acc, curr, index) => {
        if (curr.checked) {
            const name = curr.name;
            acc.push({ name, index });
        }

        return acc;
    }, []);

    const result = [...tableRowElements].map(row => {
        const obj = checkboxesData.reduce((acc, curr) => {
            acc[curr.name] = row.querySelector(`td:nth-child(${curr.index + 1})`).textContent;

            return acc;
        }, {});

        return obj;
    });

    outputElement.textContent = JSON.stringify(result);
}
