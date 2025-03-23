window.addEventListener('load', solve);

function solve() {
    const addButtonElement = document.getElementById('add-btn');
    const deleteButtonElement = document.querySelector('.btn.delete');

    const previewListUlElement =
        document.getElementById('preview-list');
    const expensesListUlElement =
        document.getElementById('expenses-list');

    addButtonElement.addEventListener('click', addHandler);

    deleteButtonElement.addEventListener('click', deleteHandler);

    function addHandler() {
        if (!isFormValid()) {
            return;
        }

        const inputValues = getInputValues();
        addButtonElement.setAttribute('disabled', 'disabled');

        const expenseItemLiElement =
            createExpenseItemLiElement(inputValues);
        previewListUlElement.appendChild(expenseItemLiElement);
        clearInputValues();
    }

    function createExpenseItemLiElement(data) {
        const expensePElement = document.createElement('p');
        expensePElement.textContent = `Type: ${data.expense}`;

        const amountPElement = document.createElement('p');
        amountPElement.textContent = `Amount: ${data.amount}$`;

        const datePElement = document.createElement('p');
        datePElement.textContent = `Date: ${data.date}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(expensePElement);
        articleElement.appendChild(amountPElement);
        articleElement.appendChild(datePElement);

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('btn', 'edit');
        editButtonElement.textContent = 'edit';
        editButtonElement.addEventListener('click', e =>
            editHandler(e, data)
        );

        const okButtonElement = document.createElement('button');
        okButtonElement.classList.add('btn', 'ok');
        okButtonElement.textContent = 'ok';
        okButtonElement.addEventListener('click', e =>
            okHandler(e, data)
        );

        const buttonsDivElement = document.createElement('div');
        buttonsDivElement.classList.add('buttons');
        buttonsDivElement.appendChild(editButtonElement);
        buttonsDivElement.appendChild(okButtonElement);

        const expenseItemLiElement = document.createElement('li');
        expenseItemLiElement.classList.add('expense-item');

        expenseItemLiElement.appendChild(articleElement);
        expenseItemLiElement.appendChild(buttonsDivElement);

        return expenseItemLiElement;
    }

    function editHandler(e, data) {
        setInputValues(data);

        const expenseItemLiElement =
            e.currentTarget.parentElement.parentElement;
        expenseItemLiElement.remove();

        addButtonElement.removeAttribute('disabled');
    }

    function okHandler(e, data) {
        const expenseItemLiElement =
            e.currentTarget.parentElement.parentElement;
        const buttonsDivElement =
            expenseItemLiElement.querySelector('.buttons');
        buttonsDivElement.remove();

        expensesListUlElement.appendChild(expenseItemLiElement);
        addButtonElement.removeAttribute('disabled');
    }

    function deleteHandler() {
        expensesListUlElement.innerHTML = '';
        previewListUlElement.innerHTML = '';
        addButtonElement.removeAttribute('disabled');
        clearInputValues();
    }

    function clearInputValues() {
        document.getElementById('expense').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('date').value = '';
    }

    function getInputValues() {
        const expense = document.getElementById('expense').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;

        return { expense, amount, date };
    }

    function setInputValues(data) {
        document.getElementById('expense').value = data.expense;
        document.getElementById('amount').value = data.amount;
        document.getElementById('date').value = data.date;
    }

    function isFormValid() {
        const expense = document
            .getElementById('expense')
            .value.trim();
        const amount = document.getElementById('amount').value.trim();
        const date = document.getElementById('date').value.trim();

        return expense && amount && date;
    }
}
