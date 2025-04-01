window.addEventListener('load', solve);

function solve() {
    const addButtonElement = document.getElementById('add-btn');

    const checkListElement = document.getElementById('check-list');
    const contactListElement =
        document.getElementById('contact-list');

    const nameInputElement = document.getElementById('name');
    const phoneInputElement = document.getElementById('phone');
    const categorySelectElement = document.getElementById('category');

    addButtonElement.addEventListener('click', submitHandler);

    const formElement = document.querySelector('form');

    function submitHandler(e) {
        e.preventDefault();

        const name = nameInputElement.value;
        const phone = phoneInputElement.value;
        const category = categorySelectElement.value;

        if (name === '' || phone === '' || category === '') {
            return;
        }

        const firstParagraphElement = document.createElement('p');
        firstParagraphElement.textContent = `name:${name}`;

        const secondParagraphElement = document.createElement('p');
        secondParagraphElement.textContent = `phone:${phone}`;

        const thirdParagraphElement = document.createElement('p');
        thirdParagraphElement.textContent = `category:${category}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(firstParagraphElement);
        articleElement.appendChild(secondParagraphElement);
        articleElement.appendChild(thirdParagraphElement);

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit-btn');
        editButtonElement.addEventListener('click', editHandler);

        const saveButtonElement = document.createElement('button');
        saveButtonElement.classList.add('save-btn');
        saveButtonElement.addEventListener('click', saveHandler);

        const buttonsWrapperElement = document.createElement('div');
        buttonsWrapperElement.classList.add('buttons');
        buttonsWrapperElement.appendChild(editButtonElement);
        buttonsWrapperElement.appendChild(saveButtonElement);

        const liElement = document.createElement('li');
        liElement.appendChild(articleElement);
        liElement.appendChild(buttonsWrapperElement);

        checkListElement.appendChild(liElement);

        formElement.reset();
    }

    function editHandler(e) {
        if (
            nameInputElement.value !== '' ||
            phoneInputElement.value !== '' ||
            categorySelectElement.value !== ''
        ) {
            return;
        }

        const button = e.target;
        const liElement = button.parentElement.parentElement;

        const name = liElement
            .querySelector('article p:nth-child(1)')
            .textContent.split('name:')[1];
        const phone = liElement
            .querySelector('article p:nth-child(2)')
            .textContent.split('phone:')[1];
        const category = liElement
            .querySelector('article p:nth-child(3)')
            .textContent.split('category:')[1];

        nameInputElement.value = name;
        phoneInputElement.value = phone;
        categorySelectElement.value = category;

        liElement.remove();
    }

    function saveHandler(e) {
        const button = e.target;
        const liElement = button.parentElement.parentElement;

        const buttonsWrapperElement =
            liElement.querySelector('.buttons');
        buttonsWrapperElement.remove();

        const buttonElement = document.createElement('button');
        buttonElement.classList.add('del-btn');
        buttonElement.addEventListener('click', deleteHandler);

        liElement.appendChild(buttonElement);

        contactListElement.appendChild(liElement);
    }

    function deleteHandler(e) {
        const button = e.target;
        const liElement = button.parentElement;
        liElement.remove();
    }
}
