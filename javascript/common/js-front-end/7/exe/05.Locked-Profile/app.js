function lockedProfile() {
    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(response => response.json())
        .then(result => displayContent(Object.values(result)));
    // .catch(err => console.log(err.message));
}

function displayContent(data) {
    const mainElement = document.querySelector('main');

    document.querySelector('.profile').remove();

    const restUserContainersWrapper =
        document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
        const userContainer = createContainer(i, data[i]);

        restUserContainersWrapper.appendChild(userContainer);
    }

    mainElement.appendChild(restUserContainersWrapper);
}

function createContainer(index, data) {
    const nextIndex = index + 1;

    const imgElement = document.createElement('img');
    imgElement.src = './iconProfile2.png';
    imgElement.classList.add('userIcon');

    const lockLabelElement = document.createElement('label');
    lockLabelElement.textContent = 'Lock';

    const lockRadioInputElement = document.createElement('input');
    lockRadioInputElement.type = 'radio';
    lockRadioInputElement.name = `user${nextIndex}Locked`;
    lockRadioInputElement.value = 'lock';
    lockRadioInputElement.checked = true;

    const unlockLabelElement = document.createElement('label');
    unlockLabelElement.textContent = 'Unlock';

    const unlockRadioInputElement = document.createElement('input');
    unlockRadioInputElement.type = 'radio';
    unlockRadioInputElement.name = `user${nextIndex}Locked`;
    unlockRadioInputElement.value = 'unlock';

    const brElement = document.createElement('br');

    const hrElement = document.createElement('hr');

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Username';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.name = `user${nextIndex}Username`;
    usernameInput.value = data.username;
    usernameInput.disabled = 'disabled';
    usernameInput.readOnly = 'readonly';

    const secondHrElement = document.createElement('hr');

    const emailLabelElement = document.createElement('label');
    emailLabelElement.textContent = 'Email:';
    const emailInputElement = document.createElement('input');
    emailInputElement.type = 'email';
    emailInputElement.name = `user${nextIndex}Email`;
    emailInputElement.value = data.email;
    emailInputElement.disabled = 'disabled';
    emailInputElement.readOnly = 'readonly';

    const ageLabelElement = document.createElement('label');
    ageLabelElement.textContent = 'Age:';
    const ageInputElement = document.createElement('input');
    ageInputElement.type = 'number';
    ageInputElement.name = `user${nextIndex}Age`;
    ageInputElement.value = data.age;
    ageInputElement.disabled = 'disabled';
    ageInputElement.readOnly = 'readonly';

    const containerElement = document.createElement('div');
    containerElement.style.display = 'none';
    containerElement.appendChild(secondHrElement);
    containerElement.appendChild(emailLabelElement);
    containerElement.appendChild(emailInputElement);
    containerElement.appendChild(ageLabelElement);
    containerElement.appendChild(ageInputElement);

    const showMoreButtonElement = document.createElement('button');
    showMoreButtonElement.textContent = 'Show more';

    showMoreButtonElement.addEventListener('click', e => {
        if (lockRadioInputElement.checked) {
            return;
        }

        const hide =
            showMoreButtonElement.textContent === 'Show more';

        showMoreButtonElement.textContent = hide
            ? 'Hide it'
            : 'Show more';

        containerElement.style.display = hide ? 'block' : 'none';
    });

    const profileDivElement = document.createElement('div');
    profileDivElement.classList.add('profile');

    profileDivElement.appendChild(imgElement);
    profileDivElement.appendChild(lockLabelElement);
    profileDivElement.appendChild(lockRadioInputElement);
    profileDivElement.appendChild(unlockLabelElement);
    profileDivElement.appendChild(unlockRadioInputElement);
    profileDivElement.appendChild(brElement);
    profileDivElement.appendChild(hrElement);
    profileDivElement.appendChild(usernameLabel);
    profileDivElement.appendChild(usernameInput);
    profileDivElement.appendChild(containerElement);
    profileDivElement.appendChild(containerElement);
    profileDivElement.appendChild(showMoreButtonElement);

    return profileDivElement;
}
